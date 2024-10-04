const actions = (
  <>
    <sl-button slot="action" variant="text" onclick={() => location.assign('/pages/tasks/')}>
      Tasks
    </sl-button>
    <sl-button
      slot="action"
      variant="text"
      onclick={() => location.assign('/pages/tasks/info.html')}
    >
      Info
    </sl-button>
  </>
);

export default actions;
