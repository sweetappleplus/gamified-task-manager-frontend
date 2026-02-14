import React from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { FileUploader, Icon, Textarea, Input, AddButton } from "components";
import { FileUploaderItem } from "components";

const sectionLabelSx = {
  fontSize: 18,
  lineHeight: "24px",
  fontWeight: 600,
  color: "grayscale.950",
  mb: "8px",
};

interface SubmissionStepProps {
  fileItems: FileUploaderItem[];
  comment: string;
  externalLinks: string[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  onCommentChange: (value: string) => void;
  onAddLink: () => void;
  onUpdateLink: (index: number, value: string) => void;
  onRemoveLink: (index: number) => void;
}

export const SubmissionStep: React.FC<SubmissionStepProps> = ({
  fileItems,
  comment,
  externalLinks,
  onAddFiles,
  onRemoveFile,
  onCommentChange,
  onAddLink,
  onUpdateLink,
  onRemoveLink,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Upload File Section */}
      <Box>
        <Typography sx={sectionLabelSx}>Upload the File</Typography>
        <FileUploader
          files={fileItems}
          onAddFiles={onAddFiles}
          onRemoveFile={onRemoveFile}
          accept=".png,.jpg,.jpeg,.mov,.pdf,.txt"
          helpText="PNG, JPG, MOV, PDF, TXT"
          multiple
        />
      </Box>

      {/* Comment Section */}
      <Box>
        <Typography sx={sectionLabelSx}>Comment</Typography>
        <Textarea
          placeholder="Add a note or a short explanation (optional)"
          maxLength={300}
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          rows={3}
        />
      </Box>

      {/* External Links Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: externalLinks.length > 0 ? "12px" : 0,
          }}
        >
          <Typography sx={{ ...sectionLabelSx, mb: 0 }}>
            External Links
          </Typography>
          <AddButton text="Add" onClick={onAddLink} />
        </Box>

        {externalLinks.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {externalLinks.map((link, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Input
                  leftIcon="link"
                  placeholder="https://example.com"
                  value={link}
                  onChange={(e) => onUpdateLink(index, e.target.value)}
                  sx={{ flex: 1 }}
                />
                <IconButton
                  onClick={() => onRemoveLink(index)}
                  disableRipple
                  sx={{ p: 0, flexShrink: 0 }}
                >
                  <Icon
                    name="x-circle"
                    size={24}
                    color={theme.palette.grayscale[300]}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
