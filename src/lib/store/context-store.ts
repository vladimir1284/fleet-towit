import { createMachine, createActor, assign } from 'xstate';

function saveToSessionStorage(key: string, value: unknown) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

const userStateMachine = createMachine({
  context: {
    user: null,
  },
  on: {
        update: {
          actions: assign({
              user: ({ event }) => event.user,
          }),
        }
    },
});

const companyStateMachine = createMachine({
  id: 'company',
  context: {
    currentCompany: {},
  },
  on: {
    'company.update': {
      actions: assign({
        currentCompany: ({event}) => {
          const currentCompany = event.value;
          saveToSessionStorage('currentCompany', currentCompany);
          return currentCompany;
        }
      })
    },
 },
});


const userActor = createActor(userStateMachine).start();
const companyActor = createActor(companyStateMachine).start();

companyActor.subscribe((state) => {
    console.log('STATE CHANGED', state);
});

userActor.subscribe((state) => {
    console.log('STATE CHANGED', state.context.user);
});

export {userActor}
export {companyActor}
