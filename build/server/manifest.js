const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.KNxEojsa.js","app":"_app/immutable/entry/app.yWHoSnO0.js","imports":["_app/immutable/entry/start.KNxEojsa.js","_app/immutable/chunks/scheduler.RAkbNlF_.js","_app/immutable/chunks/singletons.LsHtuZJq.js","_app/immutable/chunks/index.XGR6uEzK.js","_app/immutable/chunks/paths.zrnwqn2j.js","_app/immutable/chunks/stringify.ZBF_Z-nX.js","_app/immutable/entry/app.yWHoSnO0.js","_app/immutable/chunks/preload-helper.oPh3kAL_.js","_app/immutable/chunks/index.5brJxJeu.js","_app/immutable/chunks/scheduler.RAkbNlF_.js","_app/immutable/chunks/exports.vt9RsBh-.js","_app/immutable/chunks/stores.qfWq5sye.js","_app/immutable/chunks/singletons.LsHtuZJq.js","_app/immutable/chunks/index.XGR6uEzK.js","_app/immutable/chunks/paths.zrnwqn2j.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-e8320ee0.js')),
			__memo(() => import('./chunks/1-e6d360ac.js')),
			__memo(() => import('./chunks/2-ce4da750.js')),
			__memo(() => import('./chunks/3-e05abbda.js')),
			__memo(() => import('./chunks/4-b5bb1cdb.js')),
			__memo(() => import('./chunks/5-4f7162ca.js')),
			__memo(() => import('./chunks/6-9c89defc.js')),
			__memo(() => import('./chunks/7-b0133f25.js')),
			__memo(() => import('./chunks/8-5aa34803.js')),
			__memo(() => import('./chunks/9-051f6e5f.js')),
			__memo(() => import('./chunks/10-9b3cb32a.js')),
			__memo(() => import('./chunks/11-cdacbf04.js')),
			__memo(() => import('./chunks/12-43f6ba1d.js')),
			__memo(() => import('./chunks/13-d37335bb.js')),
			__memo(() => import('./chunks/14-bc407bdd.js')),
			__memo(() => import('./chunks/15-88d66c1f.js')),
			__memo(() => import('./chunks/16-987edd98.js')),
			__memo(() => import('./chunks/17-6b43f4b7.js')),
			__memo(() => import('./chunks/18-46dc4b00.js')),
			__memo(() => import('./chunks/19-a190c708.js')),
			__memo(() => import('./chunks/20-d4270cae.js')),
			__memo(() => import('./chunks/21-99762a74.js')),
			__memo(() => import('./chunks/22-d5174856.js')),
			__memo(() => import('./chunks/23-1f91c57c.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(authenticated)/admin/companies",
				pattern: /^\/admin\/companies\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(authenticated)/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(authenticated)/admin/users/delete/[userId]",
				pattern: /^\/admin\/users\/delete\/([^/]+?)\/?$/,
				params: [{"name":"userId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-84748429.js'))
			},
			{
				id: "/(authenticated)/admin/users/update/[userId]",
				pattern: /^\/admin\/users\/update\/([^/]+?)\/?$/,
				params: [{"name":"userId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(authenticated)/custom-dashboard",
				pattern: /^\/custom-dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard/inspections",
				pattern: /^\/dashboard\/inspections\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard/inspections/exception-report",
				pattern: /^\/dashboard\/inspections\/exception-report\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard/inspections/forms",
				pattern: /^\/dashboard\/inspections\/forms\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard/maintenance/defects",
				pattern: /^\/dashboard\/maintenance\/defects\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard/maintenance/inventory",
				pattern: /^\/dashboard\/maintenance\/inventory\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard/maintenance/service-programs",
				pattern: /^\/dashboard\/maintenance\/service-programs\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard/maintenance/service-schedule",
				pattern: /^\/dashboard\/maintenance\/service-schedule\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard/maintenance/service-tasks",
				pattern: /^\/dashboard\/maintenance\/service-tasks\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(authenticated)/dashboard/maintenance/work-orders",
				pattern: /^\/dashboard\/maintenance\/work-orders\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/sentry-example",
				pattern: /^\/sentry-example\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: __memo(() => import('./chunks/_server-ce66a27e.js'))
			},
			{
				id: "/(unauthenticated)/signin",
				pattern: /^\/signin\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/testing",
				pattern: /^\/testing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/(unauthenticated)/verifyRequest",
				pattern: /^\/verifyRequest\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 21 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
