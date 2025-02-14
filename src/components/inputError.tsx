import { createFormControl, IFormControl } from "solid-forms";
import { For, mergeProps, Show } from "solid-js";

type InputErrorProps = {
  name: string;
  control: IFormControl<string>;
};

export default function InputError(_props: InputErrorProps) {
  const props = mergeProps({ control: createFormControl("") }, _props);

  return (
    <Show when={props.control.isTouched && !!props.control.errors}>
      <For each={Object.values(props.control.errors || {})}>
        {(error) => (
          <p class="input-error">
            {props.name} {error}
          </p>
        )}
      </For>
    </Show>
  );
}
