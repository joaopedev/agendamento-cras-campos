import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";

export const Home: React.FC = () => {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} bg="tomato" />
      <GridItem colSpan={4} bg="papayawhip" />
      <GridItem colSpan={4} bg="tomato" />
    </Grid>
  );
};

export default Home;
