import { v4 as uuidv4 } from "uuid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material";

export interface IImagePreviewListProps {
  images: Array<File | Blob>;
  onDelete?: (index: number) => void;
}

const StyledImageListItemBar = styled(ImageListItemBar)({
  background: "none",
});

export default function ImagePreviewList({
  images,
  onDelete,
}: IImagePreviewListProps) {
  if (!images.length) return <></>;
  return (
    <ImageList
      sx={{
        height: 150,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: "translateZ(0)",
        mt: 2,
      }}
      cols={4}
      rowHeight={200}
      gap={24}
    >
      {images.map((item, index) => {
        const src = URL.createObjectURL(item);
        return (
          <ImageListItem rows={5} key={uuidv4()} sx={{ maxHeight: "125px" }}>
            <img
              style={{ height: "125px", width: "145px" }}
              src={src}
              alt={uuidv4()}
              loading="lazy"
            />
            {onDelete ? (
              <StyledImageListItemBar
                position="top"
                actionIcon={
                  <IconButton
                    aria-label={`delete image#${index + 1}`}
                    sx={{
                      background: "gba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(2px)",
                    }}
                    onClick={() => onDelete(index)}
                  >
                    <DeleteIcon color="primary" />
                  </IconButton>
                }
                actionPosition="right"
              />
            ) : null}
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
