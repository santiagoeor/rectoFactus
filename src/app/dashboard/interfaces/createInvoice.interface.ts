export interface CreateInvoice {
    document: string;
    numbering_range_id: number;
    reference_code: string;
    observation: string;
    payment_method_code: string;
    customer: Customer;
    items: Item[];
}

export interface Customer {
    identification: string;
    dv?: string;
    company?: string;
    trade_name?: string;
    names?: string;
    address?: string;
    email?: string;
    phone?: string;
    legal_organization_id: string;
    tribute_id: string;
    identification_document_id: number;
    municipality_id: string;
}

export interface Item {
    code_reference: string;
    name: string;
    quantity: number;
    discount: number;
    discount_rate: number;
    price: number;
    tax_rate: string;
    unit_measure_id: number;
    standard_code_id: number;
    is_excluded: number;
    tribute_id: number;
    withholding_taxes: WithholdingTax[];
}

export interface WithholdingTax {
    code: string;
    withholding_tax_rate: number;
}

