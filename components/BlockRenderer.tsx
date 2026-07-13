import type { Block } from "@/data/lessons";
import { IconCheck } from "@/lib/icons";

interface BlockRendererProps {
  body: Block[];
}

export default function BlockRenderer({ body }: BlockRendererProps) {
  return (
    <>
      {body.map((block, i) => (
        <BlockItem key={i} block={block} />
      ))}
    </>
  );
}

function BlockItem({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="lb-text">{block.text}</p>;

    case "h":
      return <h2>{block.text}</h2>;

    case "list":
      return (
        <ul className="lesson-list">
          {block.items.map((item, i) => (
            <li key={i}>
              <IconCheck />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="lesson-table">
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "key":
      return (
        <div className="callout callout-key">
          <span className="callout-icon">🔑</span>
          <span>{block.text}</span>
        </div>
      );

    case "tip":
      return (
        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <span>{block.text}</span>
        </div>
      );

    case "warn":
      return (
        <div className="callout callout-warn">
          <span className="callout-icon">⚠️</span>
          <span>{block.text}</span>
        </div>
      );

    case "example":
      return (
        <div className="callout callout-example">
          <span className="callout-title">Misol</span>
          <span style={{ whiteSpace: "pre-line" }}>{block.text}</span>
        </div>
      );

    case "code":
      return <pre className="lesson-code">{block.text}</pre>;
  }
}
