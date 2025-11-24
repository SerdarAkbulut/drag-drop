"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateElementText } from "../store/builder/builderSlice";
import { useEffect, useState } from "react";

interface EditElementProps {
  open: boolean;
  onClose: () => void;
  elementId: string | null;
}

export default function EditElement({
  open,
  onClose,
  elementId,
}: EditElementProps) {
  const dispatch = useDispatch();

  const element = useSelector((state: RootState) =>
    state.builder.elements.find((el) => el.id === elementId)
  );

  const [text, setText] = useState("");

  const handleSave = () => {
    if (!elementId) return;

    dispatch(
      updateElementText({
        id: elementId,
        content: { text },
      })
    );

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Element Content</DialogTitle>

      <DialogContent>
        {element ? (
          <div className="flex flex-col gap-4 mt-2">
            <TextField
              label="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </div>
        ) : (
          <p>No element selected.</p>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
