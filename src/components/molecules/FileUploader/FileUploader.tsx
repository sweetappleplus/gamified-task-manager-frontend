import React, { useRef } from "react";
import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import { Icon } from "components";
import { FileUploaderProps } from "./FileUploader.types";

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onAddFiles,
  onRemoveFile,
  accept,
  helpText,
  multiple = true,
}) => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected && selected.length > 0) {
      onAddFiles(Array.from(selected));
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Box>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {/* Upload button */}
      <ButtonBase
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          height: 64,
          borderRadius: "16px",
          border: "2px dashed",
          borderColor: "primary.main",
          bgcolor: "primary.50",
          cursor: "pointer",
        }}
      >
        <Icon name="file-add" size={24} color={theme.palette.primary.main} />
        <Typography
          sx={{
            fontSize: 16,
            lineHeight: "22px",
            fontWeight: 500,
            color: "primary.main",
          }}
        >
          Select File
        </Typography>
      </ButtonBase>

      {/* Help text */}
      {helpText && (
        <Typography
          sx={{
            mt: "6px",
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 400,
            color: "grayscale.400",
            textAlign: "center",
          }}
        >
          {helpText}
        </Typography>
      )}

      {/* File list */}
      {files.length > 0 && (
        <Box
          sx={{
            mt: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {files.map((file) => (
            <Box
              key={file.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* Document icon container */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: "primary.50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon
                  name="file"
                  size={24}
                  color={theme.palette.primary.main}
                />
              </Box>

              {/* File info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 16,
                    lineHeight: "22px",
                    fontWeight: 500,
                    color: "grayscale.950",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {file.name}
                </Typography>
                <Typography
                  sx={{
                    mt: "4px",
                    fontSize: 14,
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "grayscale.400",
                  }}
                >
                  {formatFileSize(file.size)}
                </Typography>
              </Box>

              {/* Remove button */}
              <ButtonBase
                onClick={() => onRemoveFile(file.id)}
                disableRipple
                sx={{
                  p: 0,
                  flexShrink: 0,
                }}
              >
                <Icon
                  name="x-circle"
                  size={24}
                  color={theme.palette.grayscale[300]}
                />
              </ButtonBase>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
