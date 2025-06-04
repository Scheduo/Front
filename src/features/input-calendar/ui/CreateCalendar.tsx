import { Button, Dialog, DialogTrigger } from "@/shared/ui";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CalendarFormDialog } from "./CalendarFormDialog";

export const CreateCalendar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="hover:bg-transparent" onClick={() => setIsOpen(true)}>
          <Plus size={16} className="text-grayscale-400" />
        </Button>
      </DialogTrigger>
      <CalendarFormDialog
        mode="create"
        onSubmit={async (data) => {
          console.log(data);
        }}
        onCancel={() => setIsOpen(false)}
      />
    </Dialog>
  );
};
