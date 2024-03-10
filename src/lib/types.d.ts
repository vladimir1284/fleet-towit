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

type WizardPickedPart = Pick<Part, 'criticalQty' | 'upc' | 'description' | 'name' | 'number'>;

type WizardPartRelatedReference = {
	uuid: string;
};

type WizardPickedCategory = Pick<Category, 'name'> & WizardPartRelatedReference;
export type WizardPickedVendor = Pick<Vendor, 'name'> &
	Pick<VendorOnParts, 'cost'> &
	WizardPartRelatedReference;

export type WizardPickedLocation = Pick<Location, 'name'> &
	Pick<LocationsOnParts, 'quantity' | 'unit'> &
	WizardPartRelatedReference;

export interface PartCreationWizard extends WizardPickedPart {
	vendors: WizardPickedVendor[];
	locations: WizardPickedLocation[];
	categories: WizardPickedCategory[];
}
