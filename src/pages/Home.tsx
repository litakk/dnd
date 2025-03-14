import { Column } from "@/components/custom/Column";
import React, { useState } from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({
    todo: ["Почистит обувь", "Помыть посуду", "Сходить в тулает"],
    inProgress: [],
    done: [],
  });

  const handleTaskDrop = (columnId: string, taskTitle: string) => {
    const updatedTasks = { ...tasks };
    for (const key in updatedTasks) {
      updatedTasks[key] = updatedTasks[key].filter((task) => task !== taskTitle);
    }

    updatedTasks[columnId].push(taskTitle);

    setTasks(updatedTasks);
  };

  return (
    <section className="flex items-start justify-start gap-6">
      <Column
        title="Todo"
        tasks={tasks.todo}
        onTaskDrop={(taskTitle) => handleTaskDrop("todo", taskTitle)}
      />
      <Column
        title="In progress"
        tasks={tasks.inProgress}
        onTaskDrop={(taskTitle) => handleTaskDrop("inProgress", taskTitle)}
      />
      <Column
        title="Done"
        tasks={tasks.done}
        onTaskDrop={(taskTitle) => handleTaskDrop("done", taskTitle)}
      />
    </section>
  );
};

export default Home;