import { Box, Typography, styled } from "@mui/material";
import BannerImage from "../../../../assets/images/hero_banner.png";

const HeroImage = styled("img")({
  width: "100%",
  maxHeight: "536px",
});

const HeroBanner = () => {
  return (
    <div className="relative">
      <HeroImage src={BannerImage} alt="hero banner" />
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-8">
        <Typography variant="h2" color="white">
          Infra Brain
        </Typography>
        <Typography
          variant="h6"
          component={"p"}
          color="white"
          maxWidth={"692px"}
          lineHeight={1.5}
        >
          Transform the way we desgin, build and manage infrastructure. From
          Project Planning, Scheduling, Monitoring progress, All in one
          platform.
        </Typography>
      </Box>
    </div>
  );
};

export default HeroBanner;
