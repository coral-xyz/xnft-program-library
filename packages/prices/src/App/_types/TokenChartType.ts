
import { Infer, array, object, nullable } from "superstruct";
import { GraphDataPointType } from "./GraphDataPointType";
import { ChartType } from "./ChartType";

export type TokenChartType = Infer<typeof TokenChartType>;
export const TokenChartType = object({
  activeChart: nullable(ChartType),
  minute: nullable(array(GraphDataPointType)),
  hour: nullable(array(GraphDataPointType)),
  day: nullable(array(GraphDataPointType))
})
