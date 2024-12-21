import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, PlayCircle, FileText, Download } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, updateDoc, doc, where, DocumentData } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface TrainingMaterial {
  id: string;
  title: string;
  description: string;
  type: "video" | "document";
  link: string;
  completed: boolean;
}

export function AgentTraining({ agentId }: { agentId: string }) {
  const [materials, setMaterials] = useState<TrainingMaterial[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const materialsRef = collection(db, "training_materials");
        const materialsSnapshot = await getDocs(materialsRef);
        
        const progressRef = collection(db, "onboarding_progress");
        const progressQuery = query(progressRef, where("agentId", "==", agentId));
        const progressSnapshot = await getDocs(progressQuery);
        
        const completedMaterials = new Set(
          progressSnapshot.docs.map(doc => doc.data().materialId)
        );

        const materialsData: TrainingMaterial[] = [];
        materialsSnapshot.forEach((doc) => {
          materialsData.push({
            id: doc.id,
            ...doc.data() as Omit<TrainingMaterial, 'id'>,
            completed: completedMaterials.has(doc.id)
          });
        });
        
        setMaterials(materialsData);
      } catch (error) {
        console.error("Error fetching materials:", error);
        toast({
          title: "Error",
          description: "Failed to load training materials",
          variant: "destructive"
        });
      }
    };

    fetchMaterials();
  }, [agentId, toast]);

  const markAsCompleted = async (materialId: string) => {
    try {
      const progressRef = doc(db, "onboarding_progress", `${agentId}-${materialId}`);
      await updateDoc(progressRef, {
        completed: true,
        completedAt: new Date()
      });

      setMaterials(prevMaterials =>
        prevMaterials.map(material =>
          material.id === materialId
            ? { ...material, completed: true }
            : material
        )
      );

      toast({
        title: "Progress Updated",
        description: "Training material marked as completed",
      });
    } catch (error) {
      console.error("Error updating progress:", error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive"
      });
    }
  };

  const progress = Math.round(
    (materials.filter(m => m.completed).length / (materials.length || 1)) * 100
  );

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Training & Onboarding</h2>
        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1" />
          <span className="text-sm text-muted-foreground">
            {progress}% Complete
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {materials.map((material) => (
          <Card key={material.id} className="p-4">
            <div className="flex items-start gap-4">
              {material.type === "video" ? (
                <PlayCircle className="h-8 w-8 text-primary" />
              ) : (
                <FileText className="h-8 w-8 text-primary" />
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{material.title}</h3>
                  {material.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsCompleted(material.id)}
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {material.description}
                </p>
                <Button variant="link" className="p-0" asChild>
                  <a href={material.link} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Access Material
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
