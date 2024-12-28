import Resources from "../src/Resources";

export default function mockData() {
    return {
        "home_page": {
            "services": [
                { "serviceName": "Cleaning", "icon":  Resources.mockIcons.ic_cleaning}, 
                { "serviceName": "Carpentry", "icon":  Resources.mockIcons.ic_carpentry},
                { "serviceName": "Electrical", "icon":  Resources.mockIcons.ic_electrical},
                { "serviceName": "Gardening", "icon":  Resources.mockIcons.ic_gardening},
                { "serviceName": "Laundry", "icon":  Resources.mockIcons.ic_laundry},
                { "serviceName": "Plumbing", "icon":  Resources.mockIcons.ic_plumbing},
                { "serviceName": "Salon", "icon":  Resources.mockIcons.ic_salon},
                { "serviceName": "Appliance Repair", "icon":  Resources.mockIcons.ic_appliance_repair},

            ]
        }
    };
}
