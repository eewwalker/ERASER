import { React } from "react";

/**
 * Shows error message.
 *
 * State:
 *  none
 *
 * Props:
 * -message: error msg
 * -color: color for error msg
 */


export default function Alert({ message, color }) {

  return (
    <div className="Alert" style={{ backgroundColor: color, color: 'white' }}>
      <p>{message}</p>
    </div>
  );
}
