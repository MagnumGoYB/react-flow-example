import {
  Background,
  ReactFlow,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';

import '@xyflow/react/dist/style.css';

import { initialNodes2, initialEdges2 } from './initialElements';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 56;

const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({ rankdir: 'TD' });

  nodes.forEach((node) => {
    console.log(node)
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: 'top',
      sourcePosition: 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
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
      nodes={nodes}
      edges={edges}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      <Background />
    </ReactFlow>
  );
};

export function App() {
  return <Flow />;
}
