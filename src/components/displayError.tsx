export default function DisplayError(props: { message: string }) {
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h2 class="h2">{props.message}</h2>
      </div>
    </div>
  );
}
