// let first = false,
//   second = false,
//   indi = false,
//   gross = false,
//   confirm = false,
//   notConfirm = false,
//   domestic = false,
//   domestic2 = false,
//   imported = false,
//   imported2 = false,
//   grossIndi = true,
//   capPage = false,
//   rawPage = false,
//   commonPage = false;

// $("#first-nav-item").click(() => {
//   $("#first-nav-item").addClass("active");
//   $("#second-nav-item").removeClass("active");
//   $("#third-nav-item").removeClass("active");
//   $("#cap-good-que").css("display", "block");
//   $("#raw-good-que").css("display", "none");
//   $("#raw-good-que").removeClass("active-box");
//   $("#common-questions").removeClass("active-box");
//   $("#main-section").removeClass("active-table-layout");
//   $("#FAQs").removeClass("active-faq-layout");
// });
// $("#second-nav-item").click(() => {
//   if (rawPage) {
//     $("#first-nav-item").removeClass("active");
//     $("#second-nav-item").addClass("active");
//     $("#third-nav-item").removeClass("active");
//     $("#raw-good-que").css("display", "flex");
//     $("#cap-good-que").css("display", "none");
//     $("#common-questions").removeClass("active-box");
//     $("#main-section").removeClass("active-table-layout");
//     $("#FAQs").removeClass("active-faq-layout");
//   } else {
//     alert("Please fill the details of First Tab");
//   }
// });

// $("#third-nav-item").click(() => {
//   if (commonPage) {
//     $("#first-nav-item").removeClass("active");
//     $("#second-nav-item").removeClass("active");
//     $("#third-nav-item").addClass("active");
//     $("#raw-good-que").css("display", "none");
//     $("#cap-good-que").css("display", "none");
//     $("#common-questions").addClass("active-box");
//     $("#main-section").removeClass("active-table-layout");
//     $("#FAQs").removeClass("active-faq-layout");
//     // $("#raw-good-que").addClass("active-box");
//   } else {
//     alert("Please fill the details of Second Tab");
//   }
// });

// $(".faq-div .add").click(function () {
//   $(this).closest(".faq-div").find(".ans").slideToggle();
//   const icon = $(this);
//   if (icon.attr("src") === "plus.png") {
//     icon.attr("src", "minus.png");
//   } else {
//     icon.attr("src", "plus.png");
//   }
// });

// $(document).ready(function () {
//   $("[id^=title]").on("click", function () {
//     const iconId = $(this).attr("id");
//     const sectionId = "section" + iconId.replace("title", "");
//     const section = $("#" + sectionId);
//     section.css("display", function (_, currentDisplay) {
//       return currentDisplay === "block" ? "none" : "block";
//     });
//     const icon = $(this);
//     const isExpanded = section.css("display") === "block";
//     icon.attr("src", isExpanded ? "minus.png" : "plus.png");
//   });
// });

// const learnMoreBtn = document.getElementById("learn-more-btn");
// const popupBox = document.getElementById("popup-box");
// const closeBtn = document.querySelector(".close-btn3");
// function formatNumber(id) {
//   const input = document.getElementById(id);
//   let value = input.value.replace(/[^\d.]/g, "");
//   if ((value.match(/\./g) || []).length > 1) {
//     value = value.replace(/(?!^)\./g, "");
//   }
//   let [integerPart, decimalPart] = value.split(".");
//   let lastThree = integerPart.slice(-3);
//   let otherNumbers = integerPart.slice(0, -3);
//   if (otherNumbers !== "") {
//     lastThree = "," + lastThree;
//   }
//   let formattedValue =
//     otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
//   if (decimalPart !== undefined) {
//     formattedValue += "." + decimalPart;
//   }
//   input.value = formattedValue;
// }
// function formatNumberPDF(valuePDF) {
//   console.log("valuePDF", valuePDF);

//   if (valuePDF === "N/A") {
//     return valuePDF;
//   }

//   if (isNaN(valuePDF) || valuePDF === null || valuePDF === undefined) {
//     return "Invalid Input";
//   }

//   valuePDF = parseFloat(valuePDF);
//   let isNegative = valuePDF < 0;

//   // Convert to absolute value for easier handling
//   valuePDF = Math.abs(valuePDF);

//   // Convert to crores
//   let croreValue = valuePDF / 100000;
//   let formattedValue = croreValue.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   if (isNegative) {
//     formattedValue = "-" + formattedValue;
//   }

//   return formattedValue;
// }

// function setupDisposalListeners() {
//   document.querySelectorAll('select[id$="ms"]').forEach((select, index) => {
//     select.addEventListener("change", () => {
//       console.log("Index", index);
//       let rowLetter = String.fromCharCode(97 + index);
//       console.log(rowLetter);
//       let intendedPeriodElement = document.querySelector(`#${rowLetter}ip`);
//       console.log("intendedPeriodElement", intendedPeriodElement);
//       if (select.value === "Sale in DTA") {
//         intendedPeriodElement.style.display = "block";
//       } else {
//         intendedPeriodElement.style.display = "none";
//       }
//     });
//   });
// }
// document.addEventListener("DOMContentLoaded", setupDisposalListeners);

// function safeParseFloat(value) {
//   if (typeof value !== "string") {
//     value = String(value);
//   }
//   return isNaN(parseFloat(value.replace(/,/g, "")))
//     ? 0
//     : parseFloat(value.replace(/,/g, ""));
// }

// $("#first-nav-item").addClass("active");
// $("#domestic-capital-goods-container-next").click(() => {
  
//     let selectedValue = $("#third-right-input").val();

//     if (selectedValue === "Choose") {
//         alert("Please select disposal of capital goods by the unit by way of");
//     } else {
//         console.log("Proceeding with: " + selectedValue);
//         $(".domestic-capital-goods-container").toggleClass("inactive-box");
//     }

// });
// $("#being-procured-yes").click(() => {
//   $("#being-procured-no").removeClass("active");
//   $("#being-procured-yes").addClass("active");
//   $("#cap-que-domestic").css("display", "flex");
//   $("#CapitalGoods").removeClass("inactive-box");
// });
// $("#being-procured-no").click(() => {
//   $("#being-procured-no").addClass("active");
//   $("#cap-que-domestic").css("display", "none");
//   $("#being-procured-yes").removeClass("active");
//   $("#CapitalGoods").addClass("inactive-box");
//   $("#domestic-goods-box").addClass("inactive-box");

// });

// $("#cap-que-domestic-yes").click(() => {
//   $("#cap-que-domestic-yes").addClass("active");
//   domestic = true;
//   $("#cap-que-domestic-no").removeClass("active");
//   imported = false;
//   $("#domestic-goods-title").removeClass("inactive-box");
//   $("#domestic-goods-box").removeClass("inactive-box");
//   console.log("domestic", domestic);
//   console.log("imported", imported);
// });

// $("#cap-que-domestic-no").click(() => {
//   $("#cap-que-domestic-no").addClass("active");
//   domestic = false;
//   $("#cap-que-domestic-yes").removeClass("active");
//   imported = true;
//   $("#domestic-goods-title").addClass("inactive-box");
//   $("#domestic-goods-box").addClass("inactive-box");
//   console.log("domestic", domestic);
//   console.log("imported", imported);
// });
// $("#cap-que-good-next").click(() => {
//   rawPage = true;
//   $("#cap-good-que").addClass("inactive-box");
//   $("#first-nav-item").removeClass("active");
//   $("#second-nav-item").addClass("active");
//   $("#raw-good-que").addClass("active-box");
//   $("#cap-good-que").removeClass("active-box");
// });
// $("#imported-raw-materials-domestic-sales-next").click(() => {
//   $("#imported-raw-goods2").toggleClass("inactive-box");
//   $("#raw-imported-box2").toggleClass("inactive-box");
//   $("#Domestic-Raw-Materials-container-next").toggleClass("inactive-box");
// });
// $("#Domestic-Raw-Materials-container-next").click(() => {
//   $("#Domestic-Raw-Materials-container").toggleClass("inactive-box");
//   $("#raw-material-que-next").toggleClass("inactive-box");
// });
// $("#Raw-being-procured-yes").click(() => {
//   $("#raw-materials-inputs").css("display", "flex");
//   $("#Raw-being-procured-yes").addClass("active");
//   $(".raw-que-domestic").css("display", "flex");
//   $("#Raw-being-procured-no").removeClass("active");
// });
// $("#Raw-being-procured-no").click(() => {
//   $("#raw-materials-inputs").css("display", "none");
//   $(".raw-que-domestic").css("display", "none");
//   $("#Raw-being-procured-yes").removeClass("active");
//   $("#Raw-being-procured-no").addClass("active");
// });
// $("#raw-que-domestic-yes").click(() => {
//   $("#raw-que-domestic-yes").toggleClass("active");
//   domestic = true;
//   $("#raw-que-domestic-no").removeClass("active");
//   imported = false;
//   $("#domestic-raw-goods-title").removeClass("inactive-box");
//   $("#raw-domestic-box").removeClass("inactive-box");
//   console.log("domestic", domestic);
//   console.log("imported", imported);
// });
// $("#raw-que-domestic-no").click(() => {
//   $("#raw-que-domestic-no").toggleClass("active");
//   domestic = false;
//   $("#raw-que-domestic-yes").removeClass("active");
//   imported = true;
//   $("#domestic-raw-goods-title").addClass("inactive-box");
//   $("#raw-domestic-box").addClass("inactive-box");
//   console.log("domestic", domestic);
//   console.log("imported", imported);
// });
// $("#raw-material-que-next").click(() => {
//   commonPage = true;
//   $("#third-nav-item").addClass("active");
//   $("#second-nav-item").removeClass("active");
//   $("#common-questions").addClass("active-box");
//   $("#raw-good-que").removeClass("active-box");
// });
// function displayNone() {
//   if (document.getElementById("third-right-input").value == "Sale in DTA") {
//     document.querySelector("#fourth-left").style.display = "flex";
//   } else {
//     document.querySelector("#fourth-left").style.display = "none";
//   }
// }

// $("#calculate").click(() => {
//   // $("#calculate-conatiner").css("display", "flex");
//   getAllInputValues();
// });

// let grossCIF,
//   grossBCD,
//   grossSGD,
//   grossCWD,
//   grossAIDC,
//   grossADD,
//   grossIGST,
//   grossDisposal,
//   grossIntendedPeriod,
//   GrossSWS,
//   grossCIF2,
//   grossBCD2,
//   grossSGD2,
//   grossCWD2,
//   grossAIDC2,
//   grossADD2,
//   grossIGST2,
//   GrossSWS2,
//   lifeCycle,
//   domesticCapitalGoods;

// let GrossRawCIF,
//   GrossRawBCD,
//   GrossRawSWS,
//   GrossRawAIDC,
//   GrossRawADD,
//   GrossRawSGD,
//   GrossRawCWD,
//   GrossRawIGST,
//   GrossRawCIF2,
//   GrossRawBCD2,
//   GrossRawAIDC2,
//   GrossRawADD2,
//   GrossRawSGD2,
//   GrossRawCWD2,
//   GrossRawSWS2,
//   GrossRawIGST2,
//   DomesticRawMaterialValueSEZ,
//   DomesticRawMaterialValueDomesticSale,
//   GrossRawDomesticCIF,
//   GrossRawDomesticBCD,
//   GrossRawDomesticSWS,
//   GrossRawDomesticAIDC,
//   GrossRawDomesticADD,
//   GrossRawDomesticSGD,
//   GrossRawDomesticCWD;

// let ExpectedAnnualGrowth,
//   rateOfInterest,
//   timeGap,
//   annualValueofRoDTEP,
//   GrossAnnualValue,
//   conversionOfRaw,
//   exportSales,
//   domesticSales,
//   deemedExport;

// function getAllInputValues() {
//   // Gross Value of Captical Goods imported
//   grossCIF = safeParseFloat(document.getElementById("first-left-input").value);
//   grossBCD = safeParseFloat(document.getElementById("first-right-input").value);
//   grossSGD = safeParseFloat(document.getElementById("sgd").value);
//   grossCWD = safeParseFloat(document.getElementById("cwd").value);
//   grossAIDC = safeParseFloat(
//     document.getElementById("second-left-input").value
//   );
//   grossADD = safeParseFloat(
//     document.getElementById("second-right-input").value
//   );
//   grossIGST = safeParseFloat(document.getElementById("third-left-input").value);
//   grossIntendedPeriod = safeParseFloat(
//     document.getElementById("fourth-left-input").value
//   );
//   grossDisposal = document.getElementById("third-right-input").value;
//   GrossSWS = safeParseFloat(safeParseFloat(grossBCD) * 0.1);
//   console.log(
//     "grossCIF,grossBCD,grossSGD,grossCWD,grossAIDC,grossADD,grossIGST,grossIntendedPeriod,grossDisposal,GrossSWS",
//     grossCIF,
//     grossBCD,
//     grossSGD,
//     grossCWD,
//     grossAIDC,
//     grossADD,
//     grossIGST,
//     grossIntendedPeriod,
//     grossDisposal,
//     GrossSWS
//   );

//   //Gross values of Capital goods Domestic
//   grossCIF2 = safeParseFloat(
//     document.getElementById("Dfirst-left-input").value
//   );
//   grossBCD2 = safeParseFloat(
//     document.getElementById("Dfirst-right-input").value
//   );
//   grossSGD2 = safeParseFloat(document.getElementById("Dsgd").value);
//   grossCWD2 = safeParseFloat(document.getElementById("Dcwd").value);
//   grossAIDC2 = safeParseFloat(
//     document.getElementById("Dsecond-left-input").value
//   );
//   grossADD2 = safeParseFloat(
//     document.getElementById("Dsecond-right-input").value
//   );
//   GrossSWS2 = parseFloat((safeParseFloat(grossBCD2) * 10) / 100);
//   domesticCapitalGoods = safeParseFloat(
//     document.getElementById("domesticCapitalGoods").value
//   );
//   console.log(
//     "grossCIF2,grossBCD2,grossSGD2,grossCWD2,grossAIDC2grossADD2,GrossSWS2,domesticCapitalGoods",
//     grossCIF2,
//     grossBCD2,
//     grossSGD2,
//     grossCWD2,
//     grossAIDC2,
//     grossADD2,
//     GrossSWS2,
//     domesticCapitalGoods
//   );

//   // Gross Value of Raw Material iMPORTED 1
//   GrossRawCIF = safeParseFloat(
//     document.getElementById("first-left-input2").value
//   );
//   GrossRawBCD = safeParseFloat(
//     document.getElementById("first-right-input2").value
//   );

//   GrossRawSWS = parseFloat((safeParseFloat(GrossRawBCD) * 10) / 100);
//   GrossRawAIDC = safeParseFloat(
//     document.getElementById("second-left-input2").value
//   );
//   GrossRawADD = safeParseFloat(
//     document.getElementById("second-right-input2").value
//   );
//   GrossRawSGD = safeParseFloat(document.getElementById("sgd2").value);
//   GrossRawCWD = safeParseFloat(document.getElementById("cwd2").value);
//   GrossRawIGST = safeParseFloat(
//     document.getElementById("third-left-input2").value
//   );
//   console.log(
//     "GrossRawCIF,GrossRawBCD,GrossRawSWS,GrossRawAIDC,GrossRawADD,GrossRawSGD,GrossRawCWD,GrossRawIGST",
//     GrossRawCIF,
//     GrossRawBCD,
//     GrossRawSWS,
//     GrossRawAIDC,
//     GrossRawADD,
//     GrossRawSGD,
//     GrossRawCWD,
//     GrossRawIGST
//   );

//   // Gross Value of Raw Material iMPORTED 2
//   GrossRawCIF2 = safeParseFloat(
//     document.getElementById("first-left-input22").value
//   );
//   GrossRawBCD2 = safeParseFloat(
//     document.getElementById("first-right-input22").value
//   );
//   console.log("GrossRawBCD2", GrossRawBCD2);
//   GrossRawAIDC2 = safeParseFloat(
//     document.getElementById("second-left-input22").value
//   );
//   GrossRawADD2 = safeParseFloat(
//     document.getElementById("second-right-input22").value
//   );
//   GrossRawSGD2 = safeParseFloat(document.getElementById("sgd22").value);
//   GrossRawCWD2 = safeParseFloat(document.getElementById("cwd22").value);
//   GrossRawIGST2 = safeParseFloat(
//     document.getElementById("third-left-input22").value
//   );
//   GrossRawSWS2 = parseFloat((safeParseFloat(GrossRawBCD2) * 10) / 100);
//   console.log(
//     "GrossRawCIF2,GrossRawBCD2,GrossRawAIDC2,GrossRawADD2,GrossRawSGD2,GrossRawCWD2,GrossRawIGST2,GrossRawSWS2",
//     GrossRawCIF2,
//     GrossRawBCD2,
//     GrossRawAIDC2,
//     GrossRawADD2,
//     GrossRawSGD2,
//     GrossRawCWD2,
//     GrossRawIGST2,
//     GrossRawSWS2
//   );

//   // Gross Value of Raw Material dOMESTIC
//   GrossRawDomesticCIF = safeParseFloat(
//     document.getElementById("GrossRawDomesticCIF").value
//   );
//   GrossRawDomesticBCD = safeParseFloat(
//     document.getElementById("GrossRawDomesticBCD").value
//   );
//   GrossRawDomesticSWS = parseFloat(
//     (safeParseFloat(GrossRawDomesticBCD) * 10) / 100
//   );
//   GrossRawDomesticAIDC = safeParseFloat(
//     document.getElementById("GrossRawDomesticAIDC").value
//   );
//   GrossRawDomesticADD = safeParseFloat(
//     document.getElementById("GrossRawDomesticADD").value
//   );
//   GrossRawDomesticSGD = safeParseFloat(
//     document.getElementById("GrossRawDomesticSGD").value
//   );
//   GrossRawDomesticCWD = safeParseFloat(
//     document.getElementById("GrossRawDomesticCWD").value
//   );
//   DomesticRawMaterialValueDomesticSale = safeParseFloat(
//     document.getElementById("DomesticRawMaterialValueDomesticSale").value
//   );
//   DomesticRawMaterialValueSEZ = safeParseFloat(
//     document.getElementById("DomesticRawMaterialValueSEZ").value
//   );
//   console.log(
//     "GrossRawDomesticCIF,GrossRawDomesticBCD,GrossRawDomesticSWS,GrossRawDomesticAIDC,GrossRawDomesticADD,GrossRawDomesticSGD,GrossRawDomesticCWD,DomesticRawMaterialValueDomesticSale,DomesticRawMaterialValueSEZ",
//     GrossRawDomesticCIF,
//     GrossRawDomesticBCD,
//     GrossRawDomesticSWS,
//     GrossRawDomesticAIDC,
//     GrossRawDomesticADD,
//     GrossRawDomesticSGD,
//     GrossRawDomesticCWD,
//     DomesticRawMaterialValueDomesticSale,
//     DomesticRawMaterialValueSEZ
//   );

//   // Gross Values of Common questions
//   lifeCycle = safeParseFloat(
//     document.getElementById("first-left-input3").value
//   );
//   ExpectedAnnualGrowth = safeParseFloat(
//     document.getElementById("first-right-input3").value
//   );
//   domesticSales = safeParseFloat(
//     document.getElementById("domestic-sales").value
//   );
//   exportSales = safeParseFloat(document.getElementById("export-sales").value);
//   rateOfInterest = safeParseFloat(
//     document.getElementById("second-left-input3").value
//   );
//   timeGap = safeParseFloat(
//     document.getElementById("second-right-input3").value
//   );
//   annualValueofRoDTEP = safeParseFloat(
//     document.getElementById("third-left-input3").value
//   );
//   GrossAnnualValue = safeParseFloat(
//     document.getElementById("third-right-input3").value
//   );
//   conversionOfRaw = safeParseFloat(
//     document.getElementById("fourth-right-input3").value
//   );
//   deemedExport = safeParseFloat(
//     document.getElementById("fifth-left-input5").value
//   );

//   gstOnConstruction = safeParseFloat(
//     document.getElementById("gstOnConstruction").value
//   );
//   constOfDuty = safeParseFloat(document.getElementById("constOfDuty").value);
//   SEZsale = safeParseFloat(document.getElementById("SEZsale").value);
//   igstOnprcuredvalue = safeParseFloat(
//     document.getElementById("igstOnprcuredvalue").value
//   );
//   igstOnImportServices = safeParseFloat(
//     document.getElementById("igstOnImportServices").value
//   );
//   console.log(
//     "lifeCycle,ExpectedAnnualGrowth,domesticSales,exportSales,rateOfInterest,timeGap,annualValueofRoDTEP,GrossAnnualValue",
//     lifeCycle,
//     ExpectedAnnualGrowth,
//     domesticSales,
//     exportSales,
//     rateOfInterest,
//     timeGap,
//     annualValueofRoDTEP,
//     GrossAnnualValue
//   );
//   console.log(
//     "conversionOfRaw,deemedExport,gstOnConstruction,constOfDuty,SEZsale,igstOnprcuredvalue,igstOnImportServices",
//     conversionOfRaw,
//     deemedExport,
//     gstOnConstruction,
//     constOfDuty,
//     SEZsale,
//     igstOnprcuredvalue,
//     igstOnImportServices
//   );

//   // total calculation
//   console.log("firstCal");
//   // Imported capital goods
//   let totalDuty =
//     safeParseFloat(GrossSWS) +
//     safeParseFloat(grossBCD) +
//     safeParseFloat(grossADD) +
//     safeParseFloat(grossAIDC) +
//     safeParseFloat(grossSGD) +
//     safeParseFloat(grossCWD);
//   console.log("1) totalDuty", totalDuty);

//   let TotalExport = exportSales + SEZsale + deemedExport;
//   let TotalImport = grossCIF + GrossRawCIF + GrossRawCIF2;
//   function calculateDepreciationValue(value, grossIntendedPeriod) {
//     let result = 0;
//     for (let Q = 1; Q <= grossIntendedPeriod * 4; Q++) {
//       if (Q >= 1 && Q <= 4) {
//         P = 4;
//         result += value * (P / 100);
//         console.log(value * (P / 100));
//         console.log(P);
//         console.log("result1", result);
//       }
//       if (Q >= 5 && Q <= 12) {
//         P = 3;
//         result += value * (P / 100);
//         console.log(value * (P / 100));
//         console.log(P);
//         console.log("result2", result);
//       }
//       if (Q >= 13 && Q <= 20) {
//         P = 2.5;
//         result += value * (P / 100);
//         console.log(value * (P / 100));
//         console.log(P);
//         console.log("result3", result);
//       }
//       if (Q >= 21 && Q <= 40) {
//         P = 2;
//         result += value * (P / 100);
//         console.log(value * (P / 100));
//         console.log(P);
//       }
//     }
//     console.log("result4", result);
//     return result;
//   }
//   EOUValue = "N/A";
//   if (TotalImport > TotalExport) {
//     console.log(
//       "EOU is not eligible because,totalImport ",
//       TotalImport,
//       " is less than totalExport",
//       TotalExport
//     );
//   } else {
//     if (grossIntendedPeriod < 10) {
//       grossBCDDepreciationValue = calculateDepreciationValue(
//         grossBCD,
//         grossIntendedPeriod
//       );
//       grossSGDDepreciationValue = calculateDepreciationValue(
//         grossSGD,
//         grossIntendedPeriod
//       );
//       grossCWDDepreciationValue = calculateDepreciationValue(
//         grossCWD,
//         grossIntendedPeriod
//       );
//       grossAIDCDepreciationValue = calculateDepreciationValue(
//         grossAIDC,
//         grossIntendedPeriod
//       );
//       grossADDDepreciationValue = calculateDepreciationValue(
//         grossADD,
//         grossIntendedPeriod
//       );
//       GrossSWSDepreciationValue = calculateDepreciationValue(
//         GrossSWS,
//         grossIntendedPeriod
//       );
//       console.log("grossBCDDepreciationValue", grossBCDDepreciationValue);
//       console.log("grossSGDDepreciationValue", grossSGDDepreciationValue);
//       console.log("grossCWDDepreciationValue", grossCWDDepreciationValue);
//       console.log("grossAIDCDepreciationValue", grossAIDCDepreciationValue);
//       console.log("grossADDDepreciationValue", grossADDDepreciationValue);
//       console.log("GrossSWSDepreciationValue", GrossSWSDepreciationValue);

//       let totaldeprValue =
//         grossBCDDepreciationValue +
//         grossSGDDepreciationValue +
//         grossCWDDepreciationValue +
//         grossAIDCDepreciationValue +
//         grossADDDepreciationValue +
//         GrossSWSDepreciationValue;
//       console.log("totaldeprValue", totaldeprValue);
//       // calclcualte the NPV of depre value
//       let E2 = 0;
//       for (let i = 0; i < 7; i++) {
//         if (E2 == 0) {
//           E2 = rateOfInterest / 100 + 1;
//         } else {
//           E2 = E2 * (rateOfInterest / 100 + 1);
//         }
//       }
//       let EOUValue = totaldeprValue / E2;
//       console.log("2) For EOU: Total value:  ", EOUValue);
//     }
//   }

//   let EO = (totalDuty + grossIGST) * 7;
//   console.log("EO", EO);
//   console.log("totalDuty", totalDuty);
//   console.log("IGST", grossIGST);
//   if (TotalExport < EO) {
//     let UEO = EO - TotalExport;
//     let per = (UEO / EO) * totalDuty;
//     console.log("per", per);
//     console.log("UEO", UEO);
//     let interest = (((totalDuty + grossIGST) * 15) / 100) * 7;
//     let totalDutyPayablewithinterestOnunfullfilledEO = interest + per;
//     let totalNVP = totalDutyPayablewithinterestOnunfullfilledEO;
//     console.log(
//       "totalDutyPayablewithinterestOnunfullfilledEO",
//       totalDutyPayablewithinterestOnunfullfilledEO
//     );
//     console.log("interest", interest);
//     console.log("totalNVP", totalNVP);
//     let E2 = 0;
//     for (let i = 0; i < 7; i++) {
//       if (E2 == 0) {
//         E2 = rateOfInterest / 100 + 1;
//       } else {
//         E2 = E2 * (rateOfInterest / 100 + 1);
//       }
//     }
//     let EPCGValue = totalNVP / E2;
//     console.log("2) Total NPV for EPCG", EPCGValue);
//   } else {
//     EPCGValue = "N/A";
//     console.log("EPCG is not applicable");
//   }

//   let totalNVP;
//   if (grossDisposal === "Sale in DTA") {
//     totalNVP =
//       (totalDuty /
//         Math.pow(
//           1 + safeParseFloat(rateOfInterest) / 100,
//           safeParseFloat(grossIntendedPeriod)
//         )) *
//       -1;
//   } else {
//     totalNVP = 0;
//   }
//   console.log("2) Total NPV For MOOWR ", totalNVP);

//   let totalSavings =
//     safeParseFloat(grossIGST) *
//     (safeParseFloat(rateOfInterest) / 100) *
//     (safeParseFloat(timeGap) / 365);
//   console.log("3) total Savings", totalSavings);

//   // Domestically procured capital goods
//   const AIRAccuredOnDTA = (domesticCapitalGoods * 1.5) / 100;
//   console.log("4) AIRAccuredOnDTA", AIRAccuredOnDTA);
//   const DutySavedOnDomesticalyProcuredCP =
//     grossBCD2 + GrossSWS2 + grossAIDC2 + grossADD2 + grossSGD2 + grossCWD2;
//   console.log(
//     "5) DutySavedOnDomesticalyProcuredCP",
//     DutySavedOnDomesticalyProcuredCP
//   );

//   // Imported raw materials (for exports, SEZ supplies & deemed export)
//   let RawTotalDuty =
//     safeParseFloat(GrossRawBCD) +
//     safeParseFloat(GrossRawSWS) +
//     safeParseFloat(GrossRawAIDC) +
//     safeParseFloat(GrossRawADD) +
//     safeParseFloat(GrossRawSGD) +
//     safeParseFloat(GrossRawCWD);
//   console.log("Total", RawTotalDuty);

//   let E = 0;
//   let totalBenifit = 0;
//   let lastNPV = 0;
//   let npv;
//   let tempRaw = RawTotalDuty;
//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     totalBenifit =
//       tempRaw *
//       (parseFloat(safeParseFloat(conversionOfRaw)) / 365) *
//       (parseFloat(safeParseFloat(rateOfInterest)) / 100);
//     if (E == 0) {
//       E = safeParseFloat(rateOfInterest) / 100 + 1;
//     } else {
//       E = E * (safeParseFloat(rateOfInterest) / 100 + 1);
//       // console.log("rateOfInterest", rateOfInterest);
//     }
//     npv = totalBenifit / E;
//     lastNPV += npv;
//     tempRaw = tempRaw * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   console.log("6) Raw NPV: ", lastNPV);

//   let Digst = 0;
//   let totalBenifitigst = 0;
//   let lastNPVigst = 0;
//   let npvigst;

//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     totalBenifitigst =
//       safeParseFloat(GrossRawIGST) *
//       (parseFloat(safeParseFloat(timeGap)) / 365) *
//       (parseFloat(safeParseFloat(rateOfInterest)) / 100);
//     if (Digst == 0) {
//       Digst = safeParseFloat(rateOfInterest) / 100 + 1;
//     } else {
//       Digst = Digst * (safeParseFloat(rateOfInterest) / 100 + 1);
//     }
//     npvigst = totalBenifitigst / Digst;
//     lastNPVigst += npvigst;
//     GrossRawIGST =
//       GrossRawIGST * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   console.log("7) IGST", lastNPVigst);

//   let RawTotalDuty2 =
//     safeParseFloat(GrossRawBCD2) +
//     safeParseFloat(GrossRawSWS2) +
//     safeParseFloat(GrossRawAIDC2) +
//     safeParseFloat(GrossRawADD2) +
//     safeParseFloat(GrossRawSGD2) +
//     safeParseFloat(GrossRawCWD2);
//   console.log("Total", RawTotalDuty2);

//   let E2 = 0;
//   let totalBenifit2 = 0;
//   let lastNPV2 = 0;
//   let npv2;
//   let tempRaw2 = RawTotalDuty2;
//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     totalBenifit2 =
//       tempRaw2 *
//       (parseFloat(safeParseFloat(conversionOfRaw)) / 365) *
//       (parseFloat(safeParseFloat(rateOfInterest)) / 100);
//     if (E2 == 0) {
//       E2 = safeParseFloat(rateOfInterest) / 100 + 1;
//       // console.log("E1", E2);
//     } else {
//       // console.log("e BEFORE ", E2);
//       E2 = E2 * (safeParseFloat(rateOfInterest) / 100 + 1);
//       // console.log("D2", E2);
//       // console.log("rateOfInterest", rateOfInterest);
//     }
//     npv2 = totalBenifit2 / E2;
//     lastNPV2 += npv2;
//     tempRaw2 = tempRaw2 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   console.log("8) Raw NPV: ", lastNPV2);
//   let Digst2 = 0;
//   let totalBenifitigst2 = 0;
//   let lastNPVigst2 = 0;
//   let npvigst2;
//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     totalBenifitigst2 =
//       safeParseFloat(GrossRawIGST2) *
//       (parseFloat(safeParseFloat(timeGap)) / 365) *
//       (parseFloat(safeParseFloat(rateOfInterest)) / 100);
//     console.log("totalBenifitigst2", totalBenifitigst2);
//     if (Digst2 == 0) {
//       Digst2 = safeParseFloat(rateOfInterest) / 100 + 1;
//       // console.log("Digst2", Digst2);
//     } else {
//       Digst2 = Digst2 * (safeParseFloat(rateOfInterest) / 100 + 1);
//     }
//     npvigst2 = totalBenifitigst2 / Digst2;
//     lastNPVigst2 += npvigst2;
//     GrossRawIGST2 =
//       GrossRawIGST2 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   console.log("9) IGST", lastNPVigst2);

//   let RawTotalDuty3 =
//     safeParseFloat(GrossRawDomesticBCD) +
//     safeParseFloat(GrossRawDomesticSWS) +
//     safeParseFloat(GrossRawDomesticAIDC) +
//     safeParseFloat(GrossRawDomesticADD) +
//     safeParseFloat(GrossRawDomesticSGD) +
//     safeParseFloat(GrossRawDomesticCWD);
//   console.log("Total", RawTotalDuty3);

//   // Domestic Raw Materials
//   const AIRAccuredOnDTARawMaterial = (DomesticRawMaterialValueSEZ * 1.5) / 100;
//   const IGSTonDomesticallyProcuredRawMaterials =
//     (DomesticRawMaterialValueSEZ + DomesticRawMaterialValueDomesticSale) *
//     (18 / 100) *
//     (rateOfInterest / 100) *
//     (timeGap / 365);
//   let E4 = 0;
//   for (let i = 0; i < lifeCycle; i++) {
//     if (E4 == 0) {
//       E4 = rateOfInterest / 100 + 1;
//     } else {
//       E4 = E4 * (rateOfInterest / 100 + 1);
//     }
//   }
//   let EPCGValue2 = IGSTonDomesticallyProcuredRawMaterials / E4;
//   console.log("++++++) IGSTonDomesticallyProcuredRawMaterials:  ", EPCGValue2);
//   const AIRAccuredOnDTARawMaterial2 =
//     (DomesticRawMaterialValueDomesticSale * 1.5) / 100;
//   console.log("A. AIRAccuredOnDTA", AIRAccuredOnDTARawMaterial);
//   console.log("B. AIRAccuredOnDTA", AIRAccuredOnDTARawMaterial2);
//   console.log(
//     "10) Total AIR Accured on DTA for SEZ and Domestic Sale",
//     AIRAccuredOnDTARawMaterial + AIRAccuredOnDTARawMaterial2
//   );

//   const DutySavedOnDomesticalyProcuredCPRawMaterial =
//     GrossRawDomesticBCD +
//     GrossRawDomesticSWS +
//     GrossRawDomesticAIDC +
//     GrossRawDomesticADD +
//     GrossRawDomesticSGD +
//     GrossRawDomesticCWD;
//   console.log(
//     "11) DutySavedOnDomesticalyProcuredCPRawMaterial",
//     DutySavedOnDomesticalyProcuredCPRawMaterial
//   );

//   let E3 = 0;
//   let totalBenifit3 = 0;
//   let lastNPV3 = 0;
//   let npv3;
//   let tempRaw3 = DutySavedOnDomesticalyProcuredCPRawMaterial;
//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     totalBenifit3 =
//       tempRaw3 *
//       (parseFloat(safeParseFloat(conversionOfRaw)) / 365) *
//       (parseFloat(safeParseFloat(rateOfInterest)) / 100);
//     if (E3 == 0) {
//       E3 = safeParseFloat(rateOfInterest) / 100 + 1;
//     } else {
//       E3 = E3 * (safeParseFloat(rateOfInterest) / 100 + 1);
//       // console.log("D3", E3);
//       console.log("rateOfInterest", rateOfInterest);
//     }
//     npv3 = totalBenifit3 / E3;
//     lastNPV3 += npv3;
//     tempRaw3 = tempRaw3 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   console.log(
//     "11) Duties of customs saved on the domestically procured raw materials: ",
//     lastNPV3
//   );

//   // Gross Value of Raw Material dOMESTIC
//   GrossRawDomesticCIF = safeParseFloat(
//     document.getElementById("GrossRawDomesticCIF").value
//   );
//   GrossRawDomesticBCD = safeParseFloat(
//     document.getElementById("GrossRawDomesticBCD").value
//   );
//   GrossRawDomesticSWS = parseFloat(
//     (safeParseFloat(GrossRawDomesticBCD) * 10) / 100
//   );
//   GrossRawDomesticAIDC = safeParseFloat(
//     document.getElementById("GrossRawDomesticAIDC").value
//   );
//   GrossRawDomesticADD = safeParseFloat(
//     document.getElementById("GrossRawDomesticADD").value
//   );
//   GrossRawDomesticSGD = safeParseFloat(
//     document.getElementById("GrossRawDomesticSGD").value
//   );
//   GrossRawDomesticCWD = safeParseFloat(
//     document.getElementById("GrossRawDomesticCWD").value
//   );

//   let IGSTonDPRM =
//     ((GrossRawDomesticCIF +
//       GrossRawDomesticBCD +
//       GrossRawDomesticAIDC +
//       GrossRawDomesticADD +
//       GrossRawDomesticSGD +
//       GrossRawDomesticCWD) *
//       18) /
//     100;
//   console.log("12) IGSTonDPRM", IGSTonDPRM);

//   // common question answer
//   let Drodtep = 0;
//   let totalBenifitrodtep = 0;
//   let lastNPVrodtep = 0;

//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     if (Drodtep == 0) {
//       Drodtep = safeParseFloat(rateOfInterest) / 100 + 1;
//     } else {
//       Drodtep = Drodtep * (safeParseFloat(rateOfInterest) / 100 + 1);
//     }
//     totalBenifitrodtep =
//       safeParseFloat(annualValueofRoDTEP) / safeParseFloat(Drodtep);
//     lastNPVrodtep += totalBenifitrodtep;
//     annualValueofRoDTEP =
//       safeParseFloat(annualValueofRoDTEP) *
//       (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   console.log("RoDTep Banifit", lastNPVrodtep);

//   let Dair = 0;
//   let totalBenifitair = 0;
//   let lastNPVrair = 0;
//   let npvair;
//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     if (Dair == 0) {
//       Dair = safeParseFloat(rateOfInterest) / 100 + 1;
//     } else {
//       Dair = Dair * (safeParseFloat(rateOfInterest) / 100 + 1);
//     }
//     totalBenifitair = safeParseFloat(GrossAnnualValue) / Dair;
//     npvair = totalBenifitair / Dair;
//     lastNPVrair += totalBenifitair;
//     GrossAnnualValue =
//       safeParseFloat(GrossAnnualValue) *
//       (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   let totalBenifitRoDTEP = (lastNPVrodtep + lastNPVrair) * -1;
//   console.log("13) TotalBenifitRoDTEP", totalBenifitRoDTEP);

//   console.log("14) All indsty rate", lastNPVrair);

//   const totalDutyOnRMGE =
//     GrossRawBCD +
//     GrossRawSWS +
//     GrossRawSGD +
//     GrossRawAIDC +
//     GrossRawADD +
//     GrossRawCWD;

//   let DF = 0;
//   let finishedGoods = 0;
//   let lastNPVF = 0;
//   let npvF;
//   finishedGoods =
//     (exportSales / (domesticSales + exportSales)) * totalDutyOnRMGE;
//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     if (DF == 0) {
//       DF = 1;
//     } else {
//       DF = DF * (rateOfInterest / 100 + 1);
//     }
//     npvF = finishedGoods / DF;
//     lastNPVF += npvF;
//     finishedGoods =
//       finishedGoods * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   console.log("15) totalDutyOnRMGE", lastNPVF);
//   console.log("16) gstOnConstruction", gstOnConstruction);
//   console.log("17) constOfDuty", constOfDuty);
//   let WCSOIGSTOISIAD = igstOnprcuredvalue + igstOnImportServices;
//   let Digst1 = 0;
//   let totalBenifitigst1 = 0;
//   let lastNPVigst1 = 0;
//   let npvigst1;

//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     totalBenifitigst1 =
//       safeParseFloat(WCSOIGSTOISIAD) *
//       (parseFloat(safeParseFloat(timeGap)) / 365) *
//       (parseFloat(safeParseFloat(rateOfInterest)) / 100);
//     if (Digst1 == 0) {
//       Digst1 = safeParseFloat(rateOfInterest) / 100 + 1;
//     } else {
//       Digst1 = Digst1 * (safeParseFloat(rateOfInterest) / 100 + 1);
//     }
//     npvigst1 = totalBenifitigst1 / Digst1;
//     lastNPVigst1 += npvigst1;
//     WCSOIGSTOISIAD =
//       WCSOIGSTOISIAD * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   console.log("18) WCSOIGSTOISIAD", lastNPVigst1);

//   let ACDPODSBSEZU = domesticSales - GrossRawDomesticCIF;
//   let Digst5 = 0;
//   let totalBenifitigst5 = 0;
//   let lastNPVigst5 = 0;
//   let npvigst5;

//   for (let i = 0; i < parseFloat(safeParseFloat(lifeCycle)); i++) {
//     totalBenifitigst5 =
//       safeParseFloat(ACDPODSBSEZU) *
//       (parseFloat(safeParseFloat(timeGap)) / 365) *
//       (parseFloat(safeParseFloat(rateOfInterest)) / 100);
//     if (Digst5 == 0) {
//       Digst5 = safeParseFloat(rateOfInterest) / 100 + 1;
//     } else {
//       Digst5 = Digst5 * (safeParseFloat(rateOfInterest) / 100 + 1);
//     }
//     npvigst5 = totalBenifitigst5 / Digst5;
//     lastNPVigst5 += npvigst5;
//     ACDPODSBSEZU =
//       ACDPODSBSEZU * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
//   }
//   console.log("19) ACDPODSBSEZU", lastNPVigst5);
//   updatePDFAndDownload(
//     // First Row
//     totalDuty,
//     // Second Row
//     EPCGValue,
//     totalNVP,
//     EOUValue,
//     // Third Row
//     totalSavings,
//     // Fourth Row
//     AIRAccuredOnDTA,
//     // Fifth Row
//     DutySavedOnDomesticalyProcuredCP,
//     // Sixth Row
//     lastNPV,
//     // Seventh Row
//     lastNPVigst,
//     // Eighth Row
//     lastNPV2,
//     // Ninth Row
//     lastNPVigst2,
//     // Eleventh Row
//     AIRAccuredOnDTARawMaterial + AIRAccuredOnDTARawMaterial2,
//     // Twelth Row
//     lastNPV3,
//     // Thirteenth Row
//     IGSTonDPRM,
//     // Fourteenth Row
//     totalBenifitRoDTEP,
//     // Fifteenth Row
//     lastNPVrair,
//     // Sixteenth Row
//     lastNPVF,
//     // Seventeenth Row
//     gstOnConstruction,
//     // Eighteenth Row
//     constOfDuty,
//     // Nineteenth Row
//     lastNPVigst1,
//     // Twentieth Row
//     lastNPVigst5
//   );
// }
// async function updatePDFAndDownload(
//   value0,
//   value1,
//   value2,
//   value3,
//   value4,
//   value5,
//   value6,
//   value7,
//   value8,
//   value9,
//   value10,
//   value11,
//   value12,
//   value13,
//   value14,
//   value15,
//   value16,
//   value17,
//   value18,
//   value19,
//   value20
// ) {
//   console.log("value8", value8);
//   console.log(
//     value0,
//     value1,
//     value2,
//     value3,
//     value4,
//     value5,
//     value6,
//     value7,
//     value8,
//     value9,
//     value10,
//     value11,
//     value12,
//     value13,
//     value14,
//     value15,
//     value16,
//     value17,
//     value18,
//     value19,
//     value20
//   );
//   let url = "Report.pdf";

//   const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

//   const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

//   const zero = pdfDoc.getPages()[0];
//   const firstPage = pdfDoc.getPages()[1];
//   const secondPage = pdfDoc.getPages()[2];
//   const thirdPage = pdfDoc.getPages()[3];

//   secondPage.drawText("Amount is in Lack", {
//     x: 70,
//     y: 440,
//     size: 14,
//     color: PDFLib.rgb(1, 0, 0),
//   });

//   // First Row
//   secondPage.drawText(formatNumberPDF(value0).toString(), {
//     x: 402,
//     y: 332,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value0).toString(), {
//     x: 472,
//     y: 332,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value0).toString(), {
//     x: 550,
//     y: 332,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value0).toString(), {
//     x: 624,
//     y: 332,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value0).toString(), {
//     x: 702,
//     y: 332,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Second Row
//   secondPage.drawText(formatNumberPDF(value1).toString(), {
//     x: 402,
//     y: 312,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value1).toString(), {
//     x: 472,
//     y: 312,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value2).toString(), {
//     x: 550,
//     y: 312,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value3).toString(), {
//     x: 624,
//     y: 312,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value3).toString(), {
//     x: 702,
//     y: 312,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Third Row
//   secondPage.drawText(formatNumberPDF(value4).toString(), {
//     x: 402,
//     y: 292,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value4).toString(), {
//     x: 472,
//     y: 292,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value4).toString(), {
//     x: 550,
//     y: 292,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value4).toString(), {
//     x: 624,
//     y: 292,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value4).toString(), {
//     x: 702,
//     y: 292,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Fourth Row
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 402,
//     y: 251,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 472,
//     y: 251,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 550,
//     y: 251,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 624,
//     y: 251,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value5).toString(), {
//     x: 702,
//     y: 251,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Fifth Row
//   secondPage.drawText(formatNumberPDF(value6).toString(), {
//     x: 402,
//     y: 230,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value6).toString(), {
//     x: 472,
//     y: 230,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 550,
//     y: 230,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value6).toString(), {
//     x: 624,
//     y: 230,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value6).toString(), {
//     x: 702,
//     y: 230,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Sixth Row
//   secondPage.drawText(formatNumberPDF(value7).toString(), {
//     x: 402,
//     y: 182,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 472,
//     y: 182,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value7).toString(), {
//     x: 550,
//     y: 182,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value7).toString(), {
//     x: 624,
//     y: 182,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value7).toString(), {
//     x: 702,
//     y: 182,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Seventh Row
//   secondPage.drawText(formatNumberPDF(value8).toString(), {
//     x: 402,
//     y: 148,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 472,
//     y: 148,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value8).toString(), {
//     x: 550,
//     y: 148,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value8).toString(), {
//     x: 624,
//     y: 148,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value8).toString(), {
//     x: 702,
//     y: 148,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Eighth Row
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 402,
//     y: 100,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 472,
//     y: 100,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value9).toString(), {
//     x: 550,
//     y: 100,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 624,
//     y: 100,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   secondPage.drawText(formatNumberPDF(value9).toString(), {
//     x: 702,
//     y: 100,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Nineth Row
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 402,
//     y: 490,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 472,
//     y: 490,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value10).toString(), {
//     x: 550,
//     y: 490,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value10).toString(), {
//     x: 624,
//     y: 490,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value10).toString(), {
//     x: 702,
//     y: 490,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Tenth Row
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 408,
//     y: 448,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 480,
//     y: 448,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 556,
//     y: 448,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 628,
//     y: 448,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value11).toString(), {
//     x: 704,
//     y: 448,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Eleventh Row
//   thirdPage.drawText(formatNumberPDF(value12).toString(), {
//     x: 408,
//     y: 428,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value12).toString(), {
//     x: 480,
//     y: 428,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 556,
//     y: 428,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value12).toString(), {
//     x: 628,
//     y: 428,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value12).toString(), {
//     x: 704,
//     y: 428,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Twelth Row
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 408,
//     y: 400,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 480,
//     y: 400,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 556,
//     y: 400,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 628,
//     y: 400,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value13).toString(), {
//     x: 704,
//     y: 400,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // common Questions
//   // Thirteen Row
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 408,
//     y: 336,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 480,
//     y: 336,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value14).toString(), {
//     x: 556,
//     y: 336,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 628,
//     y: 336,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 704,
//     y: 336,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Fourteen Row
//   thirdPage.drawText(formatNumberPDF(value15).toString(), {
//     x: 408,
//     y: 306,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value15).toString(), {
//     x: 480,
//     y: 306,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 556,
//     y: 306,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value15).toString(), {
//     x: 628,
//     y: 306,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value15).toString(), {
//     x: 704,
//     y: 306,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Fourteen Row
//   thirdPage.drawText(formatNumberPDF(value16).toString(), {
//     x: 408,
//     y: 286,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value16).toString(), {
//     x: 480,
//     y: 286,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value16).toString(), {
//     x: 556,
//     y: 286,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value16).toString(), {
//     x: 628,
//     y: 286,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value16).toString(), {
//     x: 704,
//     y: 286,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Fifteen Row
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 408,
//     y: 264,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 480,
//     y: 264,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 556,
//     y: 264,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 628,
//     y: 264,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value17).toString(), {
//     x: 704,
//     y: 264,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Sixteen Row
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 408,
//     y: 244,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 480,
//     y: 244,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 556,
//     y: 244,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//     x: 628,
//     y: 244,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });
//   thirdPage.drawText(formatNumberPDF(value18).toString(), {
//     x: 704,
//     y: 244,
//     size: 12,
//     color: PDFLib.rgb(0, 0, 0),
//   });

//   // Seventeen Row
//     thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//       x: 408,
//       y: 216,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });
//     thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//       x: 480,
//       y: 216,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });
//     thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//       x: 556,
//       y: 216,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });
//     thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//       x: 628,
//       y: 216,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });
//     thirdPage.drawText(formatNumberPDF(value19).toString(), {
//       x: 704,
//       y: 216,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });

//   // Seventeen Row
//     thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//       x: 408,
//       y: 184,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });
//     thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//       x: 480,
//       y: 184,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });
//     thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//       x: 556,
//       y: 184,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });
//     thirdPage.drawText(formatNumberPDF("N/A").toString(), {
//       x: 628,
//       y: 184,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });
//     thirdPage.drawText(formatNumberPDF(value20).toString(), {
//       x: 704,
//       y: 184,
//       size: 12,
//       color: PDFLib.rgb(0, 0, 0),
//     });
//   const pdfBytes = await pdfDoc.save();
//   const pdfUrl = URL.createObjectURL(
//     new Blob([pdfBytes], { type: "application/pdf" })
//   );

//   // let previewContainer;

//   // document.querySelector(".preview-container").style.display = "block";
//   // previewContainer = document.querySelector(".preview-container");

//   // previewContainer.innerHTML = `<embed src="${pdfUrl}" width="100%" height="100%" type="application/pdf">`;

//   // document.getElementById("download-report").style.display = "block";

//   // document
//   //   .getElementById("download-report")
//   //   .addEventListener("click", function () {
//   //     document.getElementById("custom-feedback-modal").style.display = "block";
//   //   });

//   // document.getElementById("skip").addEventListener("click", function () {
//   //   document.getElementById("custom-feedback-modal").style.display = "none";
//   //   downloadPDF(pdfUrl);
//   // });
//   // document
//   //   .getElementById("submit-download")
//   //   .addEventListener("click", function () {
//   //     document.getElementById("custom-feedback-modal").style.display = "none";
//   //     downloadPDF(pdfUrl);
//   //     setTimeout(function () {
//   //       location.reload();
//   //     }, 5000);
//   //   });
//   // let previewContainer;

//   // document.querySelector(".preview-container").style.display = "block";
//   // previewContainer = document.querySelector(".preview-container");

//   let modifiedPdfUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  
//   // previewContainer.innerHTML = `<embed src="${modifiedPdfUrl}" width="100%" height="100%" type="application/pdf">`;
  
//   document.getElementById("download-report").style.display = "block";
  
//   window.open(modifiedPdfUrl, "_blank");
  
//   document.getElementById("download-report").addEventListener("click", function () {
//     document.getElementById("custom-feedback-modal").style.display = "block";
//   });
  
//   document.getElementById("skip").addEventListener("click", function () {
//     document.getElementById("custom-feedback-modal").style.display = "none";
//     downloadPDF(pdfUrl);
//   });
  
//   document.getElementById("submit-download").addEventListener("click", function () {
//     document.getElementById("custom-feedback-modal").style.display = "none";
//     downloadPDF(pdfUrl);
//     setTimeout(function () {
//       location.reload();
//     }, 5000);
//   });
  
//   // Function to download PDF in another tab
//   function downloadPDF(url) {
//     let a = document.createElement("a");
//     a.href = url;
//     a.target = "_blank"; // Opens in a new tab
//     a.download = "document.pdf"; // Suggested filename
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   }
  

// }
// function downloadPDF(pdfUrl) {
//   const link = document.createElement("a");
//   link.href = pdfUrl;
//   link.download = "Optitx's Report.pdf";
//   link.target = '_blank'
//   link.click();
//   setTimeout(function () {
//     location.reload();
//   }, 1000);
// }
// document.querySelector("form").addEventListener("change", function (event) {
//   if (event.target.name === "experience" && event.target.checked) {
//     document
//       .querySelectorAll('input[name="experience"]')
//       .forEach((checkbox) => {
//         if (checkbox !== event.target) {
//           checkbox.checked = false;
//         }
//       });
//   }
// });


// function getScript(){
//   // import the script from the 

// }