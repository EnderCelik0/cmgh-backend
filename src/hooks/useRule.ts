import { useState, useEffect } from "react";
import axios from "axios";
import { SelectedItem, Rule } from "../types/types";

export const useRule = (
  selectedItem: SelectedItem,
  setSelectedItem: (item: SelectedItem) => void,
) => {
  const [rule, setRule] = useState<Rule | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isOpacityReduced, setIsOpacityReduced] = useState<boolean>(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<
    SelectedItem | undefined
  >();

  useEffect(() => {
    const fetchRule = async () => {
      try {
        const response = await axios.get("http://localhost:4001/rule");
        setRule(response.data); // Directly assign response.data to rule
      } catch (error) {
        console.error("Error fetching rule:", error);
      }
    };

    fetchRule();
  }, []);

  const handleItemClick = (item: SelectedItem) => {
    if (rule) {
      const { selectedName, selectedColor, selectedNumber } =
        rule.conditions.params;

      if (
        selectedName === item.name &&
        selectedColor === item.color &&
        selectedNumber === item.number
      ) {
        setShowDialog(true);
        setSelectedItemForModal(item);
      } else {
        setSelectedItem(item);
      }
    } else {
      setSelectedItem(item);
    }
  };

  const handleConfirm = () => {
    if (selectedItemForModal) {
      setIsOpacityReduced(true);
      setSelectedItem(selectedItemForModal);
      setShowDialog(false);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setSelectedItemForModal(undefined);
  };

  return {
    rule,
    showDialog,
    isOpacityReduced,
    handleItemClick,
    handleConfirm,
    handleCancel,
  };
};
