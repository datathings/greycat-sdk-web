export async function Foo() {
  const anonymousObj = await greycat.default.call('project::complex_object');
  const table = await greycat.default.call('project::table');

  return (
    <div className="grid">
      <gui-object value={anonymousObj} />
      <gui-object value={table} />
    </div>
  );
}
