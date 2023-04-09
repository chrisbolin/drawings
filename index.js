import { react, ReactDOM } from "../utils/react.js";

import Drawing1 from "./drawings/drawing1.js";

ReactDOM.render(
  react`<${Drawing1}/>`,
  document.getElementById("root")
);