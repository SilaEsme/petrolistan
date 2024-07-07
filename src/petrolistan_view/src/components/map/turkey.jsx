/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { drawPath, stateCode, constants } from '../../constants/map/constants';
import useMousePosition from '../../hooks/mouseTrack';
import { useState } from 'react';

export default function Turkey({
    type,
    size,
    mapColor,
    strokeColor,
    strokeWidth,
    hoverColor,
    onSelect,
    hints,
    selectColor,
    hintTextColor,
    hintBackgroundColor,
    hintPadding,
    hintBorderRadius,
  }) {
  if (type === 'select-single') {
    return (
      <TurkeySingle
        size={size}
        selectColor={selectColor}
        mapColor={mapColor}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        hoverColor={hoverColor}
        hints={hints}
        onSelect={onSelect}
        hintTextColor={hintTextColor}
        hintBackgroundColor={hintBackgroundColor}
        hintPadding={hintPadding}
        hintBorderRadius={hintBorderRadius}
      />
    );
  } else if (type === 'select-multiple') {
    return (
      <TurkeyMultiple
        size={size}
        selectColor={selectColor}
        mapColor={mapColor}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        onSelect={onSelect}
        hoverColor={hoverColor}
        hints={hints}
        hintTextColor={hintTextColor}
        hintBackgroundColor={hintBackgroundColor}
        hintPadding={hintPadding}
        hintBorderRadius={hintBorderRadius}
      />
    );
  } else {
    return null;
  }
}

const TurkeySingle = ({
  size,
  mapColor,
  strokeColor,
  selectColor,
  strokeWidth,
  hoverColor,
  hints,
  onSelect,
  hintTextColor,
  hintBackgroundColor,
  hintPadding,
  hintBorderRadius,
}) => {
  const { x, y } = useMousePosition();
  const [stateHovered, setStateHovered] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    if (selectedState) {
      const path = document.getElementById(selectedState);
      if (path) {
        path.style.fill = selectColor || constants.SELECTED_COLOR;
      }
    }
  }, [selectedState, selectColor]);

  const mapStyle = {
    width: size || constants.WIDTH,
    fill: mapColor || constants.MAPCOLOR,
    stroke: strokeColor || constants.STROKE_COLOR,
    strokeWidth: strokeWidth || constants.STROKE_WIDTH,
  };

  const handleMouseEnter = (hoverStateId) => {
    const path = document.getElementById(hoverStateId);
    setStateHovered(hoverStateId);
    if (path) {
      if (selectedState === hoverStateId) {
        path.style.fill = selectColor || constants.SELECTED_COLOR;
      } else {
        path.style.fill = hoverColor || constants.HOVERCOLOR;
      }
    }
  };

  const handleMouseLeave = (hoverStateId) => {
    const path = document.getElementById(hoverStateId);
    setStateHovered(null);
    if (path) {
      if (selectedState === hoverStateId) {
        path.style.fill = selectColor || constants.SELECTED_COLOR;
      } else {
        path.style.fill = mapColor || constants.MAPCOLOR;
      }
    }
  };

  const handleClick = (stateCode) => {
    if (selectedState) {
      const path = document.getElementById(selectedState.name);
      if (path) {
        path.style.fill = mapColor || constants.MAPCOLOR;
      }
    }
    setSelectedState(stateCode);
    if (onSelect) {
      onSelect(stateCode);
    }
  };

  return (
    <>
      <div className="map" style={mapStyle} >
        <svg className='p-4 mt-10' version="1.1" id="svg2" x="0px" y="0px" viewBox="0 0 800 340">
          {stateCode?.map((stateCode, index) => (
            <path
              key={index}
              onClick={() => handleClick(stateCode)}
              onMouseEnter={() => handleMouseEnter(stateCode.name)}
              onMouseLeave={() => handleMouseLeave(stateCode.name)}
              id={stateCode.name}
              d={drawPath[stateCode.name]}
            />
          ))}
        </svg>
      </div>
      {hints && (
        <div>
          {stateHovered && (
            <div
              style={{
                position: 'absolute',
                top: y + 20,
                left: x + 20,
                backgroundColor: hintBackgroundColor || 'white',
                padding: hintPadding || '10px',
                borderRadius: hintBorderRadius || '5px',
                border: '1px solid #ccc',
                color: hintTextColor || 'black',
              }}
            >
              {stateHovered}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const TurkeyMultiple = ({
  size,
  selectColor,
  mapColor,
  strokeColor,
  strokeWidth,
  hoverColor,
  hints,
  hintTextColor,
  hintBackgroundColor,
  hintPadding,
  hintBorderRadius,
  onSelect,
}) => {
  const [selectedStates, setSelectedStates] = useState([]);
  const { x, y } = useMousePosition();
  const [stateHovered, setStateHovered] = useState(null);

  useEffect(() => {
    selectedStates.forEach((stateCode) => {
      const path = document.getElementById(stateCode);
      if (path) {
        path.style.fill = selectColor || constants.SELECTED_COLOR;
      }
    });
  }, [selectedStates, selectColor]);

  const mapStyle = {
    width: size || constants.WIDTH,
    fill: mapColor || constants.MAPCOLOR,
    stroke: strokeColor || constants.STROKE_COLOR,
    strokeWidth: strokeWidth || constants.STROKE_WIDTH,
  };

  const handleClick = (stateCode) => {
    if (selectedStates.includes(stateCode)) {
      const remove_state_code = selectedStates.filter(
        (state) => state !== stateCode
      );
      setSelectedStates(remove_state_code);
      const path = document.getElementById(stateCode);
      if (path) {
        path.style.fill = mapColor || constants.MAPCOLOR;
      }
    } else {
      setSelectedStates([...selectedStates, stateCode]);
    }
    if (onSelect) {
      onSelect(stateCode, selectedStates);
    }
  };

  const handleMouseEnter = (hoverStateId) => {
    const path = document.getElementById(hoverStateId);
    if (path) {
      if (selectedStates.includes(hoverStateId)) {
        path.style.fill = selectColor || constants.SELECTED_COLOR;
      } else {
        path.style.fill = hoverColor || constants.HOVERCOLOR;
      }
    }
    setStateHovered(hoverStateId);
  };

  const handleMouseLeave = (hoverStateId) => {
    const path = document.getElementById(hoverStateId);
    if (path) {
      if (selectedStates.includes(hoverStateId)) {
        path.style.fill = selectColor || constants.SELECTED_COLOR;
      } else {
        path.style.fill = mapColor || constants.MAPCOLOR;
      }
    }
    setStateHovered(null);
  };

  return (
    <>
      <div className="map" style={mapStyle}>
        <svg version="1.1" id="svg2" x="0px" y="0px" viewBox="0 0 800 800">
          {stateCode?.map((stateCode, index) => (
            <path
              key={index}
              onClick={() => handleClick(stateCode)}
              onMouseEnter={() => handleMouseEnter(stateCode)}
              onMouseLeave={() => handleMouseLeave(stateCode)}
              id={stateCode}
              d={drawPath[stateCode]}
            />
          ))}
        </svg>
      </div>
      {hints && (
        <div>
          {stateHovered && (
            <div
              style={{
                position: 'absolute',
                top: y + 20,
                left: x + 20,
                backgroundColor: hintBackgroundColor || 'white',
                padding: hintPadding || '10px',
                borderRadius: hintBorderRadius || '5px',
                border: '1px solid #ccc',
                color: hintTextColor || 'black',
              }}
            >
              {stateHovered}
            </div>
          )}
        </div>
      )}
    </>
  );
};
