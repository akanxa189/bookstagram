import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

type DialogActionsProps = {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
};

export function DialogActions({
  onCancel,
  onConfirm,
  confirmLabel = "Save",
  cancelLabel = "Cancel",
  confirmDisabled,
}: DialogActionsProps) {
  return (
    <DialogFooter className="mt-2 border-0 bg-transparent p-0 sm:justify-end">
      <Button variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button onClick={onConfirm} disabled={confirmDisabled}>
        {confirmLabel}
      </Button>
    </DialogFooter>
  );
}
