import React, { useState } from "react";
import { ByteIndicator } from "@swapps/controls";
import type { AlarmSeverity } from "@swapps/controls";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";
import AlarmControls from "./shared/AlarmControls";

export default function ByteIndicatorPlayground() {
  const [value, setValue] = useState(178);
  const [numBits, setNumBits] = useState(8);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [bitOrder, setBitOrder] = useState<"msb" | "lsb">("msb");
  const [onColor, setOnColor] = useState("#24a148");
  const [offColor, setOffColor] = useState("#525252");
  const [alarmSeverity, setAlarmSeverity] = useState<AlarmSeverity>("none");
  const [connected, setConnected] = useState(true);

  return (
    <div>
      <PreviewConfigIndicator />

      <ComponentPreview label="Interactive Preview" category="controls">
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ByteIndicator
            value={value}
            numBits={numBits}
            orientation={orientation}
            bitOrder={bitOrder}
            onColor={onColor}
            offColor={offColor}
            alarmSeverity={alarmSeverity}
            connected={connected}
          />
        </div>
      </ComponentPreview>

      <div
        className="swapps-preview__controls"
        style={{
          border: "1px solid var(--ifm-color-emphasis-200)",
          borderRadius: "0 0 8px 8px",
          borderTop: "none",
          marginTop: "-1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <SectionHeader first>Value</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="byte-value">
            Value ({value} / 0x{value.toString(16).toUpperCase()})
          </label>
          <input
            id="byte-value"
            type="number"
            min={0}
            max={65535}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="byte-numbits">Bits</label>
          <select
            id="byte-numbits"
            value={numBits}
            onChange={(e) => setNumBits(parseInt(e.target.value, 10))}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
          </select>
        </div>

        <SectionHeader>Layout &amp; Colors</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="byte-orientation">Orientation</label>
          <select
            id="byte-orientation"
            value={orientation}
            onChange={(e) =>
              setOrientation(e.target.value as "horizontal" | "vertical")
            }
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="byte-bitorder">Bit order</label>
          <select
            id="byte-bitorder"
            value={bitOrder}
            onChange={(e) => setBitOrder(e.target.value as "msb" | "lsb")}
          >
            <option value="msb">MSB first</option>
            <option value="lsb">LSB first</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="byte-oncolor">On color</label>
          <input
            id="byte-oncolor"
            type="color"
            value={onColor}
            onChange={(e) => setOnColor(e.target.value)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="byte-offcolor">Off color</label>
          <input
            id="byte-offcolor"
            type="color"
            value={offColor}
            onChange={(e) => setOffColor(e.target.value)}
          />
        </div>

        <AlarmControls
          idPrefix="byte"
          alarmSeverity={alarmSeverity}
          onAlarmSeverityChange={setAlarmSeverity}
          connected={connected}
          onConnectedChange={setConnected}
        />
      </div>
    </div>
  );
}
