import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { TaskCard } from "./Task";

interface ColumnProps {
  title: string;
  tasks: string[]; 
  onTaskDrop?: (taskTitle: string) => void; 
}

export const Column: React.FC<ColumnProps> = ({ title, tasks, onTaskDrop }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false); 
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false); 
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false); 

    const taskTitle = e.dataTransfer.getData("text/plain");

    if (onTaskDrop) {
      onTaskDrop(taskTitle);
    }
  };

  return (
    <Card
      onDragOver={handleDragOver} 
      onDragEnter={handleDragOver} 
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-[350px] flex flex-col bg-gray-300 shadow-md rounded-2xl overflow-hidden ${
        isDraggingOver ? "bg-gray-300" : "" 
      }`}
    >
      <div className="p-4 bg-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <ScrollArea className="flex-1 p-4 space-y-3">
        {tasks.map((task, index) => (
          <TaskCard key={index} title={task} />
        ))}
      </ScrollArea>
      <div className="p-4 bg-gray-200 flex justify-center">
        <Button variant="outline" className="w-full">
          Create new task
        </Button>
      </div>
    </Card>
  );
};