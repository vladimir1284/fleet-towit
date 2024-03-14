import type { User } from '@auth/core/types';
import type {
	TenantUser,
	Tenant,
	Part,
	Category,
	Location,
	Vendor,
	VendorOnParts,
	LocationsOnParts
} from '@prisma/client';

export interface CustomTenantUser extends TenantUser {
	tenant: Tenant;
}

export interface CustomUserSession extends User {
	tenantUsers: CustomTenantUser[];
}

export interface QueryStringifyContraint {
	[key: string]: string;
}

export interface CustomInventoryPart extends Part {
	categories: Category[];
	locations: Location[];
	vendors: Vendor[];
}

// Wizard-related types.

type WizardPickedPart = {
	name: string;
	description: string;
	upc: string;
	// Garantee the placeholder display.
	number: string;
	criticalQty: string;
};

type WizardPartRelatedReference = {
	uuid: string;
};

export type WizardPickedCategory = {
	name: string;
} & WizardPartRelatedReference;

export type WizardPickedVendor = {
	name: string;
	// Garantee the placeholder display.
	cost: string;
} & WizardPartRelatedReference;

export type WizardPickedLocation = {
	name: string;
	unit: string;
	// Garantee the placeholder display.
	quantity: string;
} & WizardPartRelatedReference;

export interface PartCreationWizard extends WizardPickedPart {
	vendors: WizardPickedVendor[];
	locations: WizardPickedLocation[];
	categories: WizardPickedCategory[];
}
