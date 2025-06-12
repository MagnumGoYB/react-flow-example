import React from 'react'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';

import '@xyflow/react/dist/style.css';

import { initialNodes2, initialEdges2 } from './initialElements';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const lineHeight = 16;
const fontSize = 12;
const paddingY = 8;
const paddingX = 16;

const measureNodeSize = (label: string, maxLineWidth = 150) => {
  const approxCharWidth = fontSize * 1.6666666666666667; // 粗略字符宽度
  console.log('approxCharWidth:', approxCharWidth)
  const words = label.split('');
  console.log('words:', words)
  const maxCharsPerLine = Math.floor(maxLineWidth / approxCharWidth);
  console.log('maxCharsPerLine', maxCharsPerLine)
  const numLines = Math.round(words.length / maxCharsPerLine);
  console.log('numLines:', numLines)

  const width = Math.min(maxLineWidth + paddingX, label.length * approxCharWidth + paddingX); // 加 padding
  const height = numLines * lineHeight + paddingY * 2; // 加上下 padding

  return { width, height };
};

const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({
    rankdir: 'TD',
    nodesep: 28, // 节点间横向间距
    ranksep: 60, // 层级间纵向间距
  });

  nodes.forEach((node) => {
    const { width, height } = measureNodeSize(node.data.label);
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const { width, height } = measureNodeSize(node.data.label);
    const dagreNode = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: 'top',
      sourcePosition: 'bottom',
      position: {
        x: dagreNode.x - width / 2,
        y: dagreNode.y - height / 2,
      },
      style: {
        width,
        height,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        fontSize: `${fontSize}px`,
        lineHeight: `${lineHeight}px`,
        padding: `${paddingY}px ${paddingX}px`
      }
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes2,
  initialEdges2
);

const Flow = () => {
  const [nodes, setNodes] = useNodesState(layoutedNodes);
  const [edges, setEdges] = useEdgesState(layoutedEdges);

  return (
    <ReactFlow
      fitView
      nodes={nodes}
      edges={edges}
      proOptions={{ hideAttribution: true }}
    >
    </ReactFlow>
  );
};

export function App() {
  return <Flow />;
}
