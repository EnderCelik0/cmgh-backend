import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useRule } from "../hooks/useRule";

export default function Demo() {
  const { selectedItem, setSelectedItem } = useAppContext();

  const arr1 = [
    { id: 1, name: "A", color: "bg-green-400", number: 1 },
    { id: 2, name: "B", color: "bg-blue-400", number: 2 },
    { id: 3, name: "C", color: "bg-orange-400", number: 3 },
  ];

  const {
    rule,
    showDialog,
    isOpacityReduced,
    handleItemClick,
    handleConfirm,
    handleCancel,
  } = useRule(selectedItem, setSelectedItem);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <div
          className={`flex h-96 w-96 items-center justify-center rounded-lg border-4 border-blue-600 ${selectedItem.color}`}
          style={{
            opacity:
              selectedItem.name === rule?.event.disable && isOpacityReduced
                ? 0.5
                : 1,
          }}
        >
          <span className="text-4xl font-bold">
            {selectedItem.name} - {selectedItem.number}
          </span>
        </div>
        <div className="flex gap-12">
          {arr1.map((item) => (
            <div
              className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-blue-500"
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              {item.name + "-" + item.number + "-" + item.color}
            </div>
          ))}
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={handleCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Bu özellik {rule?.event.disable} iptal edilecek. Devam etmek istiyor
            musunuz?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handleCancel}>Hayır</Button>
            <Button onClick={handleConfirm}>Evet</Button>
          </DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleCancel}>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
