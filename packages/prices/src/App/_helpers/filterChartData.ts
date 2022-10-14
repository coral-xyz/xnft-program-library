import { GraphDataPointType } from "../_types/GraphDataPointType";

const timeLabel = (time: number) => {
  const date = new Date(time);
  return `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const dateLabel = (time: number) => {
  const date = new Date(time);
  return `${months[date.getMonth()]} ${date.getDate()}`;
}
const yearLabel = (time: number) => {
  const date = new Date(time);
  return `${date.getFullYear()}`;
}

export const charts = [
  "1H",
  "1D",
  "1W",
  "1M",
  "1Y",
  "ALL"
]

function filterChartData(
  chart: string,
  minuteData: GraphDataPointType[] | undefined,
  hourData: GraphDataPointType[] | undefined,
  dailyData: GraphDataPointType[] | undefined
): {
  labels: string[];
  points: GraphDataPointType[]
} | null {
  switch (chart) {
    case "1H": {
      if (!minuteData) {
        return null;
      }
      const time = 1000 * 60 * 60;
      const points = minuteData.filter((point, i, a) => (point[0] >= a[a.length - 1][0] - time));
      return {
        points,
        labels: [
          timeLabel(points[0][0]),
          timeLabel(points[Math.floor(points.length / 4)][0]),
          timeLabel(points[Math.floor(points.length * 2 / 4)][0]),
          timeLabel(points[Math.floor(points.length * 3 / 4)][0]),
          timeLabel(points[points.length - 1][0])
        ]
      }
    }
    case "1D": {
      if (!minuteData) {
        return null;
      }
      const points = minuteData.filter((_, i, a) => (i % 1 === 0 || i === a.length))
      return {
        points,
        labels: [
          timeLabel(points[0][0]),
          timeLabel(points[Math.floor(points.length * 1 / 4)][0]),
          timeLabel(points[Math.floor(points.length * 2 / 4)][0]),
          timeLabel(points[Math.floor(points.length * 3 / 4)][0]),
          timeLabel(points[points.length - 1][0])
        ]
      }
    }
    case "1W": {
      if (!hourData) {
        return null;
      }
      const time = 1000 * 60 * 60 * 24 * 7;
      const points = hourData.filter((point, i, a) => (point[0] >= a[a.length - 1][0] - time));
      return {
        points,
        labels: [
          dateLabel(points[0][0]),
          dateLabel(points[Math.floor(points.length / 4)][0]),
          dateLabel(points[Math.floor(points.length * 2 / 4)][0]),
          dateLabel(points[Math.floor(points.length * 3 / 4)][0]),
          dateLabel(points[points.length - 1][0])
        ]
      }
    }
    case "1M": {
      if (!hourData) {
        return null;
      }
      const time = 1000 * 60 * 60 * 24 * 30;
      const points = hourData.filter((point, i, a) => (point[0] >= a[a.length - 1][0] - time));
      return {
        points,
        labels: [
          dateLabel(points[0][0]),
          dateLabel(points[Math.floor(points.length / 4)][0]),
          dateLabel(points[Math.floor(points.length * 2 / 4)][0]),
          dateLabel(points[Math.floor(points.length * 3 / 4)][0]),
          dateLabel(points[points.length - 1][0])
        ]
      }
    }
    case "1Y": {
      if (!dailyData) {
        return null;
      }
      const time = 1000 * 60 * 60 * 24 * 365;
      const points = dailyData.filter((point, i, a) => (point[0] >= a[a.length - 1][0] - time));
      return {
        points,
        labels: [
          dateLabel(points[0][0]),
          dateLabel(points[Math.floor(points.length * 1 / 4)][0]),
          dateLabel(points[Math.floor(points.length * 2 / 4)][0]),
          dateLabel(points[Math.floor(points.length * 3 / 4)][0]),
          dateLabel(points[points.length - 1][0])
        ]
      }
    }
    default: {
      if (!dailyData) {
        return null;
      }
      return {
        points: dailyData,
        labels: [
          yearLabel(dailyData[0][0]),
          yearLabel(dailyData[Math.floor(dailyData.length * 1 / 4)][0]),
          yearLabel(dailyData[Math.floor(dailyData.length * 2 / 4)][0]),
          yearLabel(dailyData[Math.floor(dailyData.length * 3 / 4)][0]),
          yearLabel(dailyData[dailyData.length - 1][0])
        ]
      }
    }
  }

}

export default filterChartData;