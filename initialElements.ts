import { MarkerType } from "@xyflow/react";

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes2 = [
  {
    id: 'start',
    type: 'input',
    data: { label: '方向盘开关不起作用' },
    position: { x: 250, y: 0 }
  },
  {
    id: 'judge1',
    type: 'diamond',
    data: { label: '更换正常方向盘开关后方向盘开关有效更开关后方向盘开关有效?' },
    position: { x: 250, y: 120 }
  },
  {
    id: 'replace_switch',
    type: 'default',
    data: { label: '更换方向盘开关' },
    position: { x: 50, y: 260 }
  },
  {
    id: 'judge2',
    type: 'default',
    data: { label: '方向盘开关至PAD电路正常?' },
    position: { x: 450, y: 260 }
  },
  {
    id: 'replace_pad',
    type: 'default',
    data: { label: '更换PAD' },
    position: { x: 400, y: 400 }
  },
  {
    id: 'repair_line',
    type: 'default',
    data: { label: '维修方向盘开关至PAD电路' },
    position: { x: 600, y: 400 }
  }
]

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position,
    connectable: false,
  },
  {
    id: '4',
    data: { label: 'node 4' },
    position,
    connectable: false,
  },
  {
    id: '5',
    data: { label: 'node 5' },
    position,
    connectable: false,
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'output' },
    position,
    connectable: false,
  },
  {
    id: '7',
    type: 'output',
    connectable: false,
    data: { label: 'output' },
    position,
  },
];

export const initialEdges = [
  { id: 'e12', source: '1', target: '4', type: edgeType, animated: true },
  { id: 'e45', source: '4', target: '5', type: edgeType, animated: true },
  { id: 'e56', source: '5', target: '6', type: edgeType, animated: true },
  { id: 'e57', source: '5', target: '7', type: edgeType, animated: true },
];

export const initialEdges2 = [
  { id: 'e1', source: 'start', target: 'judge1' },
  {
    id: 'e2',
    source: 'judge1',
    target: 'replace_switch',
    label: '是',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e3',
    source: 'judge1',
    target: 'judge2',
    label: '否',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e4',
    source: 'judge2',
    target: 'replace_pad',
    label: '是',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e5',
    source: 'judge2',
    target: 'repair_line',
    label: '否',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed }
  }
]