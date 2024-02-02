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
		client: {"start":"_app/immutable/entry/start.UW5ZgUXO.js","app":"_app/immutable/entry/app.nLvfM28G.js","imports":["_app/immutable/entry/start.UW5ZgUXO.js","_app/immutable/chunks/scheduler.95zneGCs.js","_app/immutable/chunks/singletons.Usd_JwX_.js","_app/immutable/chunks/index.yBYD56_p.js","_app/immutable/chunks/paths.R4eFBbTk.js","_app/immutable/chunks/stringify.ZBF_Z-nX.js","_app/immutable/entry/app.nLvfM28G.js","_app/immutable/chunks/preload-helper.fQoXjrP-.js","_app/immutable/chunks/index.KpmgLx6c.js","_app/immutable/chunks/scheduler.95zneGCs.js","_app/immutable/chunks/exports.vt9RsBh-.js","_app/immutable/chunks/stores.dr_-HPb1.js","_app/immutable/chunks/singletons.Usd_JwX_.js","_app/immutable/chunks/index.yBYD56_p.js","_app/immutable/chunks/paths.R4eFBbTk.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-1352012d.js')),
			__memo(() => import('./chunks/1-57626af5.js')),
			__memo(() => import('./chunks/2-165c585e.js')),
			__memo(() => import('./chunks/3-5c5a723a.js')),
			__memo(() => import('./chunks/4-34cda105.js')),
			__memo(() => import('./chunks/5-8f233c7c.js')),
			__memo(() => import('./chunks/6-d2fa8de5.js')),
			__memo(() => import('./chunks/7-f0ca2aae.js')),
			__memo(() => import('./chunks/8-9f69a640.js')),
			__memo(() => import('./chunks/9-e6bdb943.js')),
			__memo(() => import('./chunks/10-2e0548d4.js')),
			__memo(() => import('./chunks/11-b46e220d.js')),
			__memo(() => import('./chunks/12-b38dc199.js')),
			__memo(() => import('./chunks/13-d5dbb918.js')),
			__memo(() => import('./chunks/14-01196a16.js')),
			__memo(() => import('./chunks/15-ae50a7df.js')),
			__memo(() => import('./chunks/16-030baf8d.js')),
			__memo(() => import('./chunks/17-42ad1df2.js')),
			__memo(() => import('./chunks/18-b1b5a4a3.js')),
			__memo(() => import('./chunks/19-c246ad13.js')),
			__memo(() => import('./chunks/20-8f14a6d8.js')),
			__memo(() => import('./chunks/21-29dfd2f0.js')),
			__memo(() => import('./chunks/22-16991015.js')),
			__memo(() => import('./chunks/23-a30f510e.js')),
			__memo(() => import('./chunks/24-9c64693d.js')),
			__memo(() => import('./chunks/25-fe6c1e03.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(authenticated)/admin/tenants",
				pattern: /^\/admin\/tenants\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(authenticated)/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2,3,4,], errors: [1,,,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(authenticated)/api/tenants/[[tenantId]]/users/[[userId]]",
				pattern: /^\/api\/tenants(?:\/([^/]+))?\/users(?:\/([^/]+))?\/?$/,
				params: [{"name":"tenantId","optional":true,"rest":false,"chained":true},{"name":"userId","optional":true,"rest":false,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-7163ab6e.js'))
			},
			{
				id: "/(authenticated)/api/tenants/[[tenantId]]",
				pattern: /^\/api\/tenants(?:\/([^/]+))?\/?$/,
				params: [{"name":"tenantId","optional":true,"rest":false,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-82bc0774.js'))
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
				id: "/(unauthenticated)/error",
				pattern: /^\/error\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(authenticated)/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(unauthenticated)/select-tenant",
				pattern: /^\/select-tenant\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/sentry-example",
				pattern: /^\/sentry-example\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: __memo(() => import('./chunks/_server-7129ffd2.js'))
			},
			{
				id: "/(unauthenticated)/signin",
				pattern: /^\/signin\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/(unauthenticated)/verifyRequest",
				pattern: /^\/verifyRequest\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 24 },
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
