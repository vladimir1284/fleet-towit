/*import { createMachine, createActor, assign } from 'xstate';

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
  context: {
    currentCompany: null,
  },
  on: {
        update: {
            actions: assign({
                currentCompany: ({event}) => event.currentCompany,
            })
      },
    },
});


const userActor = createActor(userStateMachine).start();
const companyActor = createActor(companyStateMachine).start();

companyActor.subscribe((state) => {
    console.log('STATE CHANGED', state.context.currentCompany);
});

userActor.subscribe((state) => {
    console.log('STATE CHANGED', state.context.user);
});

export {userActor}
export {companyActor}


*/