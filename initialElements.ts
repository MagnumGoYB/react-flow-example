const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

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
