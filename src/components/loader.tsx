import { mergeProps } from "solid-js";

export default function Loader(_props: { height?: number; width?: number }) {
  const props = mergeProps({ height: 32, width: 32 }, _props);

  return (
    <div class="flex items-center justify-center min-h-screen">
      <div
        class={`animate-spin rounded-full h-${props.height} w-${props.width} border-t-8 border-yellow-500`}
      ></div>
    </div>
  );
}
