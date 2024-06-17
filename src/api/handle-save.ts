// api/helpers.ts
import axios from "axios";
import { toast } from "sonner";

interface NewItem {
  name: string;
  id: number;
}

export async function handleSave(
  url: string,
  newItem: NewItem,
  itemName: string,
  onAddCallback: () => void,
) {
  const itemNameLowerCase = itemName.toLowerCase();

  if (newItem.name.trim() !== "" && newItem.id !== 0) {
    try {
      const response = await axios.post(url, newItem, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        toast.error(`Failed to add ${itemNameLowerCase}.`, {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }

      onAddCallback();
      toast.success(`${itemName} added successfully!`, {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      toast.error(`Failed to add ${itemNameLowerCase}.`, {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  } else {
    toast(`${itemName} name and ID are required.`, {
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
  }
}
