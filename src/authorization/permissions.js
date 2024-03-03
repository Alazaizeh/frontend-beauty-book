import store from 'store';

export const hasPageAccess = (requestedPage) => {

  return true;
  const entireState = store.getState();
  const Pages = entireState.auth.pages;
  return Pages.includes(requestedPage);
};

export const isActionAllowed = (requestedAction) => {
  return true;
  const entireState = store.getState();
  const Actions = entireState.auth.actions;
  return Actions.some((action) => action === requestedAction);
};
