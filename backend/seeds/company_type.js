
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("company_type").del()
    .then(function () {
      // Inserts seed entries
      return knex("company_type").insert([
        {name: "Accounting"},
        {name: "Admin & HR"},
        {name: "Banking / Finance"},
        {name: "Beauty Care / Health"},
        {name: "Building & Construction"},
        {name: "Design"},
        {name: "E-commerce"},
        {name: "Education"},
        {name: "Engineering"},
        {name: "Hospitality / F & B"},
        {name: "Information Technology (IT)"},
        {name: "Insurance"},
        {name: "Management"},
        {name: "Manufacturing"},
        {name: "Marketing / Public Relations"},
        {name: "Media & Advertising"},
        {name: "Medical Services"},
        {name: "Merchandising & Purchasing"},
        {name: "Professional Services"},
        {name: "Property / Real Estate"},
        {name: "Public / Civil"},
        {name: "Sales, CS & Business Devpt"},
        {name: "Sciences, Lab, R&D"},
        {name: "Transportation & Logistics"},
        {name: "Others"},
      ]);
    });
};
