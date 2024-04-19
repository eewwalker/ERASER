import React from "react";
import { Box, RangeSelector, Stack, Text } from "grommet";


/**
 * Component for RGBSlider - slider component with numeric values.
 *
 *  State:
 *  - values: like [0, 127]
 *
 *  Props:
 *  - color: like 'r' || 'g' || 'b'
 *  - formData: state from parent (RGBForm)
 *  - setFormData: state from parent (RGBForm)
 *
 *  App -> RoutesList -> Photos -> SinglePhoto -> RGBForm -> RGBSlider
 */


const RGBSlider = ({ color, formData, setFormData }) => {
  const [values, setValues] = React.useState([formData[color]]);

  const handleChange = (newValues) => {
    setValues(newValues);
    setFormData((prevData) => ({
      ...prevData,
      [color]: newValues[1],
    }));
  };

  return (
    <Stack>
      <Box direction="row" justify="between">
        {[0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 255].map((value) => (
          <Box key={value} pad="small" border={false}>
            <Text style={{ fontFamily: "monospace" }}>{value}</Text>
          </Box>
        ))}
      </Box>
      <RangeSelector
        direction="horizontal"
        invert={false}
        name={color}
        min={0}
        max={255}
        size="full"
        round="small"
        values={values}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default RGBSlider;
