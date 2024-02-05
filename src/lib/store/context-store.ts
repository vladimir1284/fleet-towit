import { createMachine, createActor, assign } from 'xstate';

function saveToSessionStorage(key: string, value: unknown) {
	sessionStorage.setItem(key, JSON.stringify(value));
}

function loadFromSessionStorage(key: string) {
	const value = sessionStorage.getItem(key);
	return value ? JSON.parse(value) : undefined;
}

const userStateMachine = createMachine({
	context: {
		user: null
	},
	on: {
		update: {
			actions: assign({
				user: ({ event }) => event.user
			})
		}
	}
});

const tenantStateMachine = createMachine({
	id: 'tenant',
	context: {
		currentTenant: 'initial'
	},
	on: {
		'tenant.update': {
			actions: assign({
				currentTenant: ({ event }) => {
					const currentTenant = event.value;
					saveToSessionStorage('currentTenant', currentTenant);
					return currentTenant;
				}
			})
		},
		'tenant.init': {
			actions: assign({
				currentTenant: ({ event }) => {
					const currentTenant = loadFromSessionStorage(event.value);
					return currentTenant;
				}
			})
		}
	}
});

const userActor = createActor(userStateMachine).start();
const tenantActor = createActor(tenantStateMachine).start();

export { userActor };
export { tenantActor };
