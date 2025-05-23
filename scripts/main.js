function getSafeFloatInput(elementId, defaultValue) {
  const rawValue = document.getElementById(elementId).value.trim();
  const parsedValue = parseFloat(rawValue);

  if (rawValue === "" || parsedValue === 0 || isNaN(parsedValue)) {
    return defaultValue;
  }
  return parsedValue;
}

function formatNumberPDF(valuePDF) {
  if (valuePDF === "N/A" || valuePDF === "Nil") {
    return valuePDF;
  }

  if (isNaN(valuePDF) || valuePDF === null || valuePDF === undefined) {
    return "Invalid Input";
  }

  valuePDF = parseFloat(valuePDF);
  let isNegative = valuePDF < 0;

  valuePDF = Math.abs(valuePDF);

  let croreValue = valuePDF / 100000;

  let roundedValue = Math.round(croreValue);

  let formattedValue = roundedValue.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

  if (isNegative) {
    formattedValue = "-" + formattedValue;
  }

  return formattedValue;
}
function safeParseFloat(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return isNaN(parseFloat(value.replace(/,/g, "")))
    ? 0
    : parseFloat(value.replace(/,/g, ""));
}

let grossCIF,
  grossBCD,
  grossSGD,
  grossCWD,
  grossAIDC,
  grossADD,
  grossIGST,
  grossDisposal,
  grossIntendedPeriod,
  GrossSWS,
  grossCIF2,
  grossBCD2,
  grossSGD2,
  grossCWD2,
  grossAIDC2,
  grossADD2,
  grossIGST2,
  GrossSWS2,
  domesticCapitalGoods;

let GrossRawCIF,
  GrossRawBCD,
  GrossRawSWS,
  GrossRawAIDC,
  GrossRawADD,
  GrossRawSGD,
  GrossRawCWD,
  GrossRawIGST,
  GrossRawCIF2,
  GrossRawBCD2,
  GrossRawAIDC2,
  GrossRawADD2,
  GrossRawSGD2,
  GrossRawCWD2,
  GrossRawSWS2,
  GrossRawIGST2,
  DomesticRawMaterialValueSEZ,
  DomesticRawMaterialValueDomesticSale,
  GrossRawDomesticCIF,
  GrossRawDomesticBCD,
  GrossRawDomesticSWS,
  GrossRawDomesticAIDC,
  GrossRawDomesticADD,
  GrossRawDomesticSGD,
  GrossRawDomesticCWD;

let ExpectedAnnualGrowth,
  rateOfInterest,
  timeGap,
  annualValueofRoDTEP,
  GrossAnnualValue,
  conversionOfRaw,
  exportSales,
  domesticSales,
  deemedExport;

// 0) Parse Float Function
function safeParseFloat(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return isNaN(parseFloat(value.replace(/,/g, "")))
    ? 0
    : parseFloat(value.replace(/,/g, ""));
}

// 1) Calculate Total Duty
function CalculateDuty(
  value1 = 0,
  value2 = 0,
  value3 = 0,
  value4 = 0,
  value5 = 0,
  value6 = 0
) {
  return (
    safeParseFloat(value1) +
    safeParseFloat(value2) +
    safeParseFloat(value3) +
    safeParseFloat(value4) +
    safeParseFloat(value5) +
    safeParseFloat(value6)
  );
}

// 2) Calculate Depreciation of value
function calculateDepreciationValue(value, grossIntendedPeriod) {
  let result = 0;
  let h = 100;
  for (let Q = 1; Q <= grossIntendedPeriod * 4; Q++) {
    if (Q >= 1 && Q <= 4) {
      P = 4;
      h -= P;
      console.log("H", h);
      if (h == 84) {
        result = value * (h / 100);
        console.log("result1", result);
      }
    }
    if (Q >= 5 && Q <= 12) {
      P = 3;
      h -= P;
      console.log("H", h);
      if (h == 72 || h == 60) {
        result = value * (h / 100);
        console.log("result2", result);
      }
    }
    if (Q >= 13 && Q <= 20) {
      P = 2.5;
      h -= P;
      console.log("H", h);
      if (h == 50 || h == 40) {
        result = value * (h / 100);
        console.log("result3", result);
      }
    }
    if (Q >= 21 && Q <= 40) {
      P = 2;
      h -= P;
      console.log("H", h);
      if (h == 32 || h == 24 || h == 16 || h == 8 || h == 0) {
        result = value * (h / 100);
        console.log("result2", result);
      }
    }
  }
  console.log("result4", result);
  return result;
}

// 3) Calculate NPV
function CalculateNPV(Value, rateOfInterest, years) {
  let E = 0;
  for (let i = 0; i < years; i++) {
    if (E == 0) {
      E = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      E = E * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
  }
  console.log(Math.round(Value / E));
  return Math.round(Value / E);
}

// 4) Calculate Growth for value till number of years
function CalculateGrowth(value, growthRate, years) {
  let result = 0;
  for (let i = 0; i < years; i++) {
    if (i == 0) {
      value = value;
    } else {
      value = value * (1 + growthRate / 100);
    }
    result += value;
  }
  return result;
}

let RawTotalDuty = CalculateDuty(
  safeParseFloat(GrossRawBCD),
  safeParseFloat(GrossRawSWS),
  safeParseFloat(GrossRawAIDC),
  safeParseFloat(GrossRawADD),
  safeParseFloat(GrossRawSGD),
  safeParseFloat(GrossRawCWD)
);
console.log("Total", RawTotalDuty);

async function getAllInputValues() {
  // Gross Value of Captical Goods imported
  grossCIF = safeParseFloat(document.getElementById("first-left-input").value);
  grossBCD = safeParseFloat(document.getElementById("first-right-input").value);
  grossSGD = safeParseFloat(document.getElementById("sgd").value);
  grossCWD = safeParseFloat(document.getElementById("cwd").value);
  grossAIDC = safeParseFloat(
    document.getElementById("second-left-input").value
  );
  grossADD = safeParseFloat(
    document.getElementById("second-right-input").value
  );
  grossIGST = safeParseFloat(document.getElementById("third-left-input").value);
  grossIntendedPeriod = safeParseFloat(
    document.getElementById("fourth-left-input").value
  );

  grossDisposal = document.getElementById("third-right-input").value;
  GrossSWS = safeParseFloat(safeParseFloat(grossBCD) * 0.1);
  console.log(
    "grossCIF,grossBCD,grossSGD,grossCWD,grossAIDC,grossADD,grossIGST,grossIntendedPeriod,grossDisposal,GrossSWS",
    grossCIF,
    grossBCD,
    grossSGD,
    grossCWD,
    grossAIDC,
    grossADD,
    grossIGST,
    grossIntendedPeriod,
    grossDisposal,
    GrossSWS
  );

  //Gross values of Capital goods Domestic
  grossCIF2 = safeParseFloat(
    document.getElementById("Dfirst-left-input").value
  );
  grossBCD2 = safeParseFloat(
    document.getElementById("Dfirst-right-input").value
  );
  grossSGD2 = safeParseFloat(document.getElementById("Dsgd").value);
  grossCWD2 = safeParseFloat(document.getElementById("Dcwd").value);
  grossAIDC2 = safeParseFloat(
    document.getElementById("Dsecond-left-input").value
  );
  grossADD2 = safeParseFloat(
    document.getElementById("Dsecond-right-input").value
  );
  GrossSWS2 = parseFloat((safeParseFloat(grossBCD2) * 10) / 100);
  domesticCapitalGoods = safeParseFloat(
    document.getElementById("domesticCapitalGoods").value
  );
  console.log(
    "grossCIF2,grossBCD2,grossSGD2,grossCWD2,grossAIDC2grossADD2,GrossSWS2,domesticCapitalGoods",
    grossCIF2,
    grossBCD2,
    grossSGD2,
    grossCWD2,
    grossAIDC2,
    grossADD2,
    GrossSWS2,
    domesticCapitalGoods
  );

  // Gross Value of Raw Material iMPORTED 1
  GrossRawCIF = safeParseFloat(
    document.getElementById("first-left-input2").value
  );
  GrossRawBCD = safeParseFloat(
    document.getElementById("first-right-input2").value
  );

  GrossRawSWS = parseFloat((safeParseFloat(GrossRawBCD) * 10) / 100);
  GrossRawAIDC = safeParseFloat(
    document.getElementById("second-left-input2").value
  );
  GrossRawADD = safeParseFloat(
    document.getElementById("second-right-input2").value
  );
  GrossRawSGD = safeParseFloat(document.getElementById("sgd2").value);
  GrossRawCWD = safeParseFloat(document.getElementById("cwd2").value);
  GrossRawIGST = safeParseFloat(
    document.getElementById("third-left-input2").value
  );
  console.log(
    "GrossRawCIF,GrossRawBCD,GrossRawSWS,GrossRawAIDC,GrossRawADD,GrossRawSGD,GrossRawCWD,GrossRawIGST",
    GrossRawCIF,
    GrossRawBCD,
    GrossRawSWS,
    GrossRawAIDC,
    GrossRawADD,
    GrossRawSGD,
    GrossRawCWD,
    GrossRawIGST
  );

  // Gross Value of Raw Material iMPORTED 2
  GrossRawCIF2 = safeParseFloat(
    document.getElementById("first-left-input22").value
  );
  GrossRawBCD2 = safeParseFloat(
    document.getElementById("first-right-input22").value
  );
  console.log("GrossRawBCD2", GrossRawBCD2);
  GrossRawAIDC2 = safeParseFloat(
    document.getElementById("second-left-input22").value
  );
  GrossRawADD2 = safeParseFloat(
    document.getElementById("second-right-input22").value
  );
  GrossRawSGD2 = safeParseFloat(document.getElementById("sgd22").value);
  GrossRawCWD2 = safeParseFloat(document.getElementById("cwd22").value);
  GrossRawIGST2 = safeParseFloat(
    document.getElementById("third-left-input22").value
  );
  GrossRawSWS2 = parseFloat((safeParseFloat(GrossRawBCD2) * 10) / 100);
  console.log(
    "GrossRawCIF2,GrossRawBCD2,GrossRawAIDC2,GrossRawADD2,GrossRawSGD2,GrossRawCWD2,GrossRawIGST2,GrossRawSWS2",
    GrossRawCIF2,
    GrossRawBCD2,
    GrossRawAIDC2,
    GrossRawADD2,
    GrossRawSGD2,
    GrossRawCWD2,
    GrossRawIGST2,
    GrossRawSWS2
  );

  // Gross Value of Raw Material dOMESTIC
  GrossRawDomesticCIF = safeParseFloat(
    document.getElementById("GrossRawDomesticCIF").value
  );
  GrossRawDomesticBCD = safeParseFloat(
    document.getElementById("GrossRawDomesticBCD").value
  );
  GrossRawDomesticSWS = parseFloat(
    (safeParseFloat(GrossRawDomesticBCD) * 10) / 100
  );
  GrossRawDomesticAIDC = safeParseFloat(
    document.getElementById("GrossRawDomesticAIDC").value
  );
  GrossRawDomesticADD = safeParseFloat(
    document.getElementById("GrossRawDomesticADD").value
  );
  GrossRawDomesticSGD = safeParseFloat(
    document.getElementById("GrossRawDomesticSGD").value
  );
  GrossRawDomesticCWD = safeParseFloat(
    document.getElementById("GrossRawDomesticCWD").value
  );
  DomesticRawMaterialValueDomesticSale = safeParseFloat(
    document.getElementById("DomesticRawMaterialValueDomesticSale").value
  );
  DomesticRawMaterialValueSEZ = safeParseFloat(
    document.getElementById("DomesticRawMaterialValueSEZ").value
  );
  console.log(
    "GrossRawDomesticCIF,GrossRawDomesticBCD,GrossRawDomesticSWS,GrossRawDomesticAIDC,GrossRawDomesticADD,GrossRawDomesticSGD,GrossRawDomesticCWD,DomesticRawMaterialValueDomesticSale,DomesticRawMaterialValueSEZ",
    GrossRawDomesticCIF,
    GrossRawDomesticBCD,
    GrossRawDomesticSWS,
    GrossRawDomesticAIDC,
    GrossRawDomesticADD,
    GrossRawDomesticSGD,
    GrossRawDomesticCWD,
    DomesticRawMaterialValueDomesticSale,
    DomesticRawMaterialValueSEZ
  );
  // Gross Value of Raw Material dOMESTIC
  GrossRawDomesticCIF = safeParseFloat(
    document.getElementById("GrossRawDomesticCIF").value
  );
  GrossRawDomesticBCD = safeParseFloat(
    document.getElementById("GrossRawDomesticBCD").value
  );
  GrossRawDomesticSWS = parseFloat(
    (safeParseFloat(GrossRawDomesticBCD) * 10) / 100
  );
  GrossRawDomesticAIDC = safeParseFloat(
    document.getElementById("GrossRawDomesticAIDC").value
  );
  GrossRawDomesticADD = safeParseFloat(
    document.getElementById("GrossRawDomesticADD").value
  );
  GrossRawDomesticSGD = safeParseFloat(
    document.getElementById("GrossRawDomesticSGD").value
  );
  GrossRawDomesticCWD = safeParseFloat(
    document.getElementById("GrossRawDomesticCWD").value
  );

  // Gross Values of Common questions
  ExpectedAnnualGrowth = getSafeFloatInput("first-right-input3", 5);
  domesticSales = safeParseFloat(
    document.getElementById("domestic-sales").value
  );
  exportSales = safeParseFloat(document.getElementById("export-sales").value);
  rateOfInterest = getSafeFloatInput("second-left-input3", 9);
  timeGap = getSafeFloatInput("second-right-input3", 35);
  console.log("TimeGap", timeGap);

  annualValueofRoDTEP = safeParseFloat(
    document.getElementById("third-left-input3").value
  );
  GrossAnnualValue = safeParseFloat(
    document.getElementById("third-right-input3").value
  );
  conversionOfRaw = getSafeFloatInput("fourth-right-input3", 60);
  deemedExport = safeParseFloat(
    document.getElementById("fifth-left-input5").value
  );

  gstOnConstruction = safeParseFloat(
    document.getElementById("gstOnConstruction").value
  );
  constOfDuty = safeParseFloat(document.getElementById("constOfDuty").value);
  SEZsale = safeParseFloat(document.getElementById("SEZsale").value);
  igstOnprcuredvalue = safeParseFloat(
    document.getElementById("igstOnprcuredvalue").value
  );
  igstOnImportServices = safeParseFloat(
    document.getElementById("igstOnImportServices").value
  );
  console.log(
    "grossIntendedPeriod,ExpectedAnnualGrowth,domesticSales,exportSales,rateOfInterest,timeGap,annualValueofRoDTEP,GrossAnnualValue",
    grossIntendedPeriod,
    ExpectedAnnualGrowth,
    domesticSales,
    exportSales,
    rateOfInterest,
    timeGap,
    annualValueofRoDTEP,
    GrossAnnualValue
  );
  console.log(
    "conversionOfRaw,deemedExport,gstOnConstruction,constOfDuty,SEZsale,igstOnprcuredvalue,igstOnImportServices",
    conversionOfRaw,
    deemedExport,
    gstOnConstruction,
    constOfDuty,
    SEZsale,
    igstOnprcuredvalue,
    igstOnImportServices
  );
  // total calculation
  console.log("firstCal");
  // Imported capital goods

  // 1) Total Import Duty (Row 1 (all Cells))
  let totalDuty = CalculateDuty(
    safeParseFloat(GrossSWS),
    safeParseFloat(grossBCD),
    safeParseFloat(grossADD),
    safeParseFloat(grossAIDC),
    safeParseFloat(grossSGD),
    safeParseFloat(grossCWD)
  );
  let totalDutyandIGST = CalculateDuty(totalDuty, grossIGST);
  console.log("1) totalDuty", totalDuty);

  // 2) EPCG AA + BR (Row 2 (First AND Second Cell))
  let EPCGValue = "Nil";
  let TotalImportedRawMaterialsForNYears1 = CalculateGrowth(
    GrossRawCIF,
    5,
    grossIntendedPeriod
  );
  let TotalImportedRawMaterialsForNYears2 = CalculateGrowth(
    GrossRawCIF2,
    5,
    grossIntendedPeriod
  );
  let TotalExport =
    CalculateGrowth(exportSales, 5, grossIntendedPeriod) +
    CalculateGrowth(SEZsale, 5, grossIntendedPeriod) +
    CalculateGrowth(deemedExport, 5, grossIntendedPeriod);
  let TotalImport =
    grossCIF +
    TotalImportedRawMaterialsForNYears1 +
    TotalImportedRawMaterialsForNYears2;
  let ExportObligationForEPCG = totalDutyandIGST * 6;
  let TotalExportForSixYears = CalculateGrowth(
    exportSales + SEZsale + deemedExport,
    5,
    6
  );
  console.log("exportSales", exportSales);
  console.log("SEZsale", SEZsale);
  console.log("deemedExport", deemedExport);
  console.log("TotalExportForSixYears", TotalExportForSixYears);
  console.log("ExportObligationForEPCG", ExportObligationForEPCG);

  // scenario 1A (applicable where EO in case of EPCG is completed within six years
  if (ExportObligationForEPCG < TotalExportForSixYears) {
    console.log(
      "Since the EO is fulfilled i.e. export within six year at M24 is more than the EO at E 13. therefore in the report in row no. 2 below AA+EPCG and BR+EPCG duty payable on redemption to be shown as nil "
    );
    EPCGValue = "Nil";
  }
  // scenario 1B (applicable where EO in case of EPCG is partially complete)
  if (ExportObligationForEPCG > TotalExportForSixYears) {
    let unfulfilledEO = ExportObligationForEPCG - TotalExportForSixYears;
    console.log("unfulfilledEO", unfulfilledEO);
    let ratioOfUnfulfilledEO = (unfulfilledEO / ExportObligationForEPCG) * 100;
    console.log("ratioOfUnfulfilledEO", ratioOfUnfulfilledEO);
    let unfulfilledEOUnderEPCG = (totalDuty * ratioOfUnfulfilledEO) / 100;
    console.log("unfulfilledEOUnderEPCG", unfulfilledEOUnderEPCG);
    let IGSTPayableatSeventhYear = (grossIGST * ratioOfUnfulfilledEO) / 100;
    console.log("IGSTPayableatSeventhYear", IGSTPayableatSeventhYear);
    let EPCGInterest =
      (((unfulfilledEOUnderEPCG + IGSTPayableatSeventhYear) * 15) / 100) * 7;
    console.log("EPCGInterest", EPCGInterest);
    let totalCostOfRedemption = unfulfilledEOUnderEPCG + EPCGInterest;
    console.log("totalCostOfRedemption", totalCostOfRedemption);
    let NPVOFcostofRedemption = CalculateNPV(
      totalCostOfRedemption,
      rateOfInterest,
      7
    );
    console.log("NPVOFcostofRedemption", NPVOFcostofRedemption);
    EPCGValue = NPVOFcostofRedemption * -1;
  }
  console.log("2 A) EPCGValue", EPCGValue);

  // 3) MOOWR Value (Row 2(Third Cell))
  // scenario 1 A (Sale In DTA)
  let RowTwoThirdCell = 0;
  console.log("grossDisposal", grossDisposal);
  if (grossDisposal === "Sale in DTA") {
    RowTwoThirdCell =
      CalculateNPV(totalDuty, rateOfInterest, grossIntendedPeriod) * -1;
  } else if (grossDisposal === "Destroy") {
    // scenario 1 B (Destroy)
    RowTwoThirdCell = 0;
  } else if (grossDisposal === "Export") {
    // scenario 1 C (Export)
    RowTwoThirdCell = 0;
  } else {
    RowTwoThirdCell = 0;
  }
  RowTwoThirdCell = safeParseFloat(RowTwoThirdCell);
  console.log("2 B) RowTwoThirdCell", RowTwoThirdCell);

  // 4) EOU Value(Row 2(Fourth & Fifth Cell))
  let EOUValue = "N/A";
  console.log("TotalImport", TotalImport);
  console.log("TotalExport", TotalExport);

  let NFE = TotalExport - TotalImport;
  console.log("NFE", NFE);
  if (NFE < 0) {
    console.log("NFE for the intended period of project is negative");
    console.log(
      "EOU is not eligible because,totalImport ",
      TotalImport,
      " is more than totalExport",
      TotalExport
    );
    EOUValue = "N/A";
  } else if (NFE > 0 && grossIntendedPeriod < 10) {
    let totalDutyDepre = calculateDepreciationValue(
      totalDuty,
      grossIntendedPeriod
    );
    console.log("totalDutyDepre", totalDutyDepre);
    console.log(
      "2 C) For EOU: Total value (Total Duty):  ",
      CalculateNPV(totalDutyDepre, rateOfInterest, grossIntendedPeriod)
    );
    EOUValue =
      CalculateNPV(totalDutyDepre, rateOfInterest, grossIntendedPeriod) * -1;
  } else if (NFE > 0 && grossIntendedPeriod >= 10) {
    EOUValue = 0;
  } else {
    EOUValue = "N/A";
  }
  console.log("2 C) For EOU:", EOUValue);
  let totalSavings =
    safeParseFloat(grossIGST) *
    (safeParseFloat(rateOfInterest) / 100) *
    (safeParseFloat(timeGap) / 365);
  console.log("3) total Savings", totalSavings);

  // Domestically procured capital goods
  const AIRAccuredOnDTA = (domesticCapitalGoods * 1.5) / 100;
  console.log("4) AIRAccuredOnDTA", AIRAccuredOnDTA);
  let DutySavedOnDomesticalyProcuredCPNetAIR;
  // for EPCG, BR, EOU
  const DutySavedOnDomesticalyProcuredCP =
    grossBCD2 + GrossSWS2 + grossAIDC2 + grossADD2 + grossSGD2 + grossCWD2;
  // for SEZ
  DutySavedOnDomesticalyProcuredCPNetAIR =
    DutySavedOnDomesticalyProcuredCP - AIRAccuredOnDTA;
  console.log(
    "5 A) DutySavedOnDomesticalyProcuredCP",
    DutySavedOnDomesticalyProcuredCP
  );
  console.log(
    "5 B) DutySavedOnDomesticalyProcuredCPNetAIR",
    DutySavedOnDomesticalyProcuredCPNetAIR
  );

  let DCGValue = 0;
  let DCG = domesticCapitalGoods;
  let BCDISWS = domesticCapitalGoods * (11 / 100);
  let DCGANDBCDISWSIGST = (DCG + BCDISWS) * (18 / 100);
  let TOTALDUTYINCLUDINGIGST = BCDISWS + DCGANDBCDISWSIGST;
  let EOFORDCG = TOTALDUTYINCLUDINGIGST * 6;
  if (EOFORDCG > TotalExportForSixYears) {
    let unfulfilledEOFORDCG = EOFORDCG - TotalExportForSixYears;
    console.log("unfulfilledEOFORDCG", unfulfilledEOFORDCG);

    let ratioOfUnfulfilledFORDCG = (unfulfilledEOFORDCG / EOFORDCG) * 100;
    console.log("ratioOfUnfulfilledFORDCG", ratioOfUnfulfilledFORDCG);

    let DOCOTIGSTPAEO7Y = BCDISWS * (ratioOfUnfulfilledFORDCG / 100);
    console.log("DOCOTIGSTPAEO7Y", DOCOTIGSTPAEO7Y);

    let IGSTPayableatSeventhYear =
      (DCGANDBCDISWSIGST * ratioOfUnfulfilledFORDCG) / 100;
    console.log("IGSTPayableatSeventhYear", IGSTPayableatSeventhYear);

    let DCGInterest =
      (((DOCOTIGSTPAEO7Y + IGSTPayableatSeventhYear) * 15) / 100) * 7;
    console.log("DCGInterest", DCGInterest);

    let totalCostOfRedemption = DOCOTIGSTPAEO7Y + DCGInterest;
    console.log("totalCostOfRedemption", totalCostOfRedemption);
    let NPVOFcostofRedemption = CalculateNPV(
      totalCostOfRedemption,
      rateOfInterest,
      7
    );
    console.log("NPVOFcostofRedemption", NPVOFcostofRedemption);
    DCGValue = NPVOFcostofRedemption;
  }
  console.log("6) DCGValue", DCGValue);

  // Imported raw materials (for exports, SEZ supplies & deemed export)
  let RawTotalDuty = CalculateDuty(
    safeParseFloat(GrossRawBCD),
    safeParseFloat(GrossRawSWS),
    safeParseFloat(GrossRawAIDC),
    safeParseFloat(GrossRawADD),
    safeParseFloat(GrossRawSGD),
    safeParseFloat(GrossRawCWD)
  );
  console.log("Total", RawTotalDuty);

  let E = 0;
  let totalBenifit = 0;
  let lastNPV = 0;
  let npv;
  let tempRaw = RawTotalDuty;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifit =
      tempRaw *
      (parseFloat(safeParseFloat(conversionOfRaw)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (E == 0) {
      E = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      E = E * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npv = totalBenifit / E;
    lastNPV += npv;
    tempRaw = tempRaw * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("7) Raw NPV: ", lastNPV);

  let Digst = 0;
  let totalBenifitigst = 0;
  let lastNPVigst = 0;
  let npvigst;

  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifitigst =
      safeParseFloat(GrossRawIGST) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (Digst == 0) {
      Digst = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Digst = Digst * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvigst = totalBenifitigst / Digst;
    lastNPVigst += npvigst;
    GrossRawIGST =
      GrossRawIGST * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("8) IGST", lastNPVigst);

  let RawTotalDuty2 =
    safeParseFloat(GrossRawBCD2) +
    safeParseFloat(GrossRawSWS2) +
    safeParseFloat(GrossRawAIDC2) +
    safeParseFloat(GrossRawADD2) +
    safeParseFloat(GrossRawSGD2) +
    safeParseFloat(GrossRawCWD2);
  console.log("Total", RawTotalDuty2);

  const totalDutyOnRMGE =
    GrossRawBCD +
    GrossRawSWS +
    GrossRawSGD +
    GrossRawAIDC +
    GrossRawADD +
    GrossRawCWD;

  let DF = 0;
  let finishedGoods = 0;
  let lastNPVF = 0;
  let npvF;
  finishedGoods =
    (exportSales / (domesticSales + exportSales)) * totalDutyOnRMGE;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    if (DF == 0) {
      DF = 1 + safeParseFloat(rateOfInterest) / 100;
    } else {
      DF = DF * (rateOfInterest / 100 + 1);
    }
    npvF = finishedGoods / DF;
    lastNPVF += npvF;
    finishedGoods =
      finishedGoods * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  lastNPVF = safeParseFloat(lastNPVF);
  console.log("9) totalDutyOnRMGE", lastNPVF);

  let E2 = 0;
  let totalBenifit2 = 0;
  let lastNPV2 = 0;
  let npv2;
  let tempRaw2 = RawTotalDuty2;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifit2 =
      tempRaw2 *
      (parseFloat(safeParseFloat(conversionOfRaw)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (E2 == 0) {
      E2 = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      E2 = E2 * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npv2 = totalBenifit2 / E2;
    lastNPV2 += npv2;
    tempRaw2 = tempRaw2 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("10) Raw NPV: ", lastNPV2);

  let Digst2 = 0;
  let totalBenifitigst2 = 0;
  let lastNPVigst2 = 0;
  let npvigst2;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifitigst2 =
      safeParseFloat(GrossRawIGST2) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    console.log("totalBenifitigst2", totalBenifitigst2);
    if (Digst2 == 0) {
      Digst2 = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Digst2 = Digst2 * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvigst2 = totalBenifitigst2 / Digst2;
    lastNPVigst2 += npvigst2;
    GrossRawIGST2 =
      GrossRawIGST2 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("11) IGST", lastNPVigst2);

  let RawTotalDuty3 =
    safeParseFloat(GrossRawDomesticBCD) +
    safeParseFloat(GrossRawDomesticSWS) +
    safeParseFloat(GrossRawDomesticAIDC) +
    safeParseFloat(GrossRawDomesticADD) +
    safeParseFloat(GrossRawDomesticSGD) +
    safeParseFloat(GrossRawDomesticCWD);
  console.log("Total", RawTotalDuty3);

  // Domestic Raw Materials
  const AIRAccuredOnDTARawMaterial = (DomesticRawMaterialValueSEZ * 1.5) / 100;
  const AIRAccuredOnDTARawMaterial2 =
    (DomesticRawMaterialValueDomesticSale * 1.5) / 100;
  let AIRAccuredOnTARawMaterial = CalculateDuty(
    AIRAccuredOnDTARawMaterial,
    AIRAccuredOnDTARawMaterial2
  );
  console.log("AIRAccuredOnTARawMaterial", AIRAccuredOnTARawMaterial);
  let DRM = 0;
  let lastNPVDRM = 0;
  let npvDRM;

  let tempAIRAccuredOnTARawMaterial = AIRAccuredOnTARawMaterial;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    if (DRM == 0) {
      DRM = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      DRM = DRM * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvDRM = tempAIRAccuredOnTARawMaterial / DRM;
    lastNPVDRM += npvDRM;
    tempAIRAccuredOnTARawMaterial =
      tempAIRAccuredOnTARawMaterial *
      (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("A. AIRAccuredOnDTA", AIRAccuredOnDTARawMaterial);
  console.log("B. AIRAccuredOnDTA", AIRAccuredOnDTARawMaterial2);
  console.log(
    "12) Total AIR Accured on DTA for SEZ and Domestic Sale",
    lastNPVDRM
  );

  let DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR;
  const DutySavedOnDomesticalyProcuredCPRawMaterial =
    GrossRawDomesticBCD +
    GrossRawDomesticSWS +
    GrossRawDomesticAIDC +
    GrossRawDomesticADD +
    GrossRawDomesticSGD +
    GrossRawDomesticCWD;

  console.log(
    "DutySavedOnDomesticalyProcuredCPRawMaterial",
    DutySavedOnDomesticalyProcuredCPRawMaterial
  );
  let E3 = 0;
  let lastNPV3 = 0;
  let npv3;
  let tempRaw3 = DutySavedOnDomesticalyProcuredCPRawMaterial;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    if (E3 == 0) {
      E3 = 1 + safeParseFloat(rateOfInterest) / 100;
    } else {
      E3 = E3 * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npv3 = tempRaw3 / E3;
    lastNPV3 += npv3;
    tempRaw3 = tempRaw3 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }

  console.log("**) lastNPV3", lastNPV3);
  console.log("**) lastNPVDRM", lastNPVDRM);

  DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR = lastNPV3 - lastNPVDRM;
  console.log(
    "DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR",
    DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR
  );
  if (lastNPV3 > lastNPVDRM) {
    DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR =
      DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR;
  } else if (lastNPV3 < lastNPVDRM) {
    DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR = "N/A";
  }
  console.log(
    "13 A) Duties of customs saved on the domestically procured raw materials: ",
    lastNPV3
  );

  console.log(
    "13 B) Duties of customs saved on the domestically procured raw materials: ",
    DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR
  );

  let igst = 0;
  let totalIgst = 0;
  let lastNpvIGST = 0;
  let NpvIgst;
  let CurrentIGST =
    ((DomesticRawMaterialValueSEZ + DomesticRawMaterialValueDomesticSale) *
      18) /
    100;
  console.log("CurrentIGST", CurrentIGST);
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalIgst =
      safeParseFloat(CurrentIGST) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    console.log("totalBenifitigst2", totalIgst);
    if (igst == 0) {
      igst = 1 + safeParseFloat(rateOfInterest) / 100;
    } else {
      igst = igst * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    NpvIgst = totalIgst / igst;
    console.log("NpvIgst", NpvIgst);
    lastNpvIGST += NpvIgst;
    CurrentIGST =
      CurrentIGST * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("14) Saving Of oportunities cost of capital on ", lastNpvIGST);

  // common question answer

  let Drodtep = 0;
  let npv4, npv5, npv6;
  let lastNPVrodtep = 0;
  let lastNPVtotalBenifit = 0;
  let totalBenifitrodtep = annualValueofRoDTEP;
  let lastNPVradtepAndAir = GrossAnnualValue;

  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    if (Drodtep == 0) {
      Drodtep = 1 + safeParseFloat(rateOfInterest) / 100;
    } else {
      Drodtep = Drodtep * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npv4 = totalBenifitrodtep / Drodtep;
    npv5 = lastNPVradtepAndAir / Drodtep;
    console.log("NPV4", npv4);
    console.log("NPV5", npv5);

    lastNPVrodtep += npv4;
    lastNPVtotalBenifit += npv5;

    console.log("Total NPV of Redtep", lastNPVrodtep);
    console.log("Total NPV of AIR", lastNPVtotalBenifit);

    totalBenifitrodtep =
      totalBenifitrodtep * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
    lastNPVradtepAndAir =
      lastNPVradtepAndAir * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  lastNPVrodtep = lastNPVrodtep * -1;
  lastNPVtotalBenifit = lastNPVtotalBenifit * -1;
  console.log("15) RoDTep Banifit", lastNPVrodtep);
  console.log("16) AIR Banifit", lastNPVtotalBenifit);
  console.log("17) gstOnConstruction", gstOnConstruction);
  console.log("18) constOfDuty", constOfDuty);
  let WCSOIGSTOISIAD = igstOnprcuredvalue + igstOnImportServices;
  let Digst1 = 0;
  let totalBenifitigst1 = 0;
  let lastNPVigst1 = 0;
  let npvigst1;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifitigst1 =
      safeParseFloat(WCSOIGSTOISIAD) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (Digst1 == 0) {
      Digst1 = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Digst1 = Digst1 * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvigst1 = totalBenifitigst1 / Digst1;
    lastNPVigst1 += npvigst1;
    WCSOIGSTOISIAD =
      WCSOIGSTOISIAD * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  lastNPVigst1 = lastNPVigst1;
  console.log("19) WCSOIGSTOISIAD", lastNPVigst1);

  let ACDPODSBSEZU = domesticSales - GrossRawCIF2;
  console.log("ACDPODSBSEZU", ACDPODSBSEZU);
  console.log("domesticSales", domesticSales);
  console.log("GrossRawCIF2", GrossRawCIF2);
  let Digst5 = 0;
  let totalBenifitigst5 = 0;
  let lastNPVigst5 = 0;
  let npvigst5;

  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifitigst5 =
      safeParseFloat(ACDPODSBSEZU) * (parseFloat(safeParseFloat(10)) / 100);
    if (Digst5 == 0) {
      Digst5 = 1 + safeParseFloat(rateOfInterest) / 100;
    } else {
      Digst5 = Digst5 * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvigst5 = totalBenifitigst5 / Digst5;
    lastNPVigst5 += npvigst5 * -1;
    ACDPODSBSEZU =
      ACDPODSBSEZU * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("20) ACDPODSBSEZU", lastNPVigst5);
  function normalizeValue(value) {
    if (
      value === "Nil" ||
      value === "N/A" ||
      value === null ||
      value === undefined
    ) {
      return 0;
    }
    return value;
  }

  let NetBeniftForAA =
    normalizeValue(totalDuty) +
    normalizeValue(EPCGValue) +
    normalizeValue(totalSavings) +
    normalizeValue(DutySavedOnDomesticalyProcuredCP) +
    normalizeValue(lastNPV) +
    normalizeValue(lastNPVigst) +
    normalizeValue(lastNPV3) +
    normalizeValue(lastNPVtotalBenifit) +
    normalizeValue(lastNPVrodtep) +
    normalizeValue(lastNPVF);
  console.log(
    "totalDuty,EPCGValue,totalSavings,DutySavedOnDomesticalyProcuredCP,lastNPV,lastNPVigst,lastNPV3,lastNPVtotalBenifit,lastNPVrodtep,lastNPVF",
    totalDuty,
    EPCGValue,
    totalSavings,
    DutySavedOnDomesticalyProcuredCP,
    lastNPV,
    lastNPVigst,
    lastNPV3,
    lastNPVtotalBenifit,
    lastNPVrodtep,
    lastNPVF
  );

  let NetBeniftForBR =
    normalizeValue(totalDuty) +
    normalizeValue(EPCGValue) +
    normalizeValue(totalSavings) +
    normalizeValue(DutySavedOnDomesticalyProcuredCP) +
    normalizeValue(DCGValue) +
    normalizeValue(lastNPV3) +
    normalizeValue(lastNPVtotalBenifit) +
    normalizeValue(lastNPVF);
  console.log(
    "totalDuty,EPCGValue,totalSavings,DutySavedOnDomesticalyProcuredCP,DCGValue,lastNPV3,lastNPVtotalBenifit,lastNPVF",
    totalDuty,
    EPCGValue,
    totalSavings,
    DutySavedOnDomesticalyProcuredCP,
    DCGValue,
    lastNPV3,
    lastNPVtotalBenifit,
    lastNPVF
  );
  let NetBeniftForMOOWR =
    normalizeValue(totalDuty) +
    normalizeValue(RowTwoThirdCell) +
    normalizeValue(totalSavings) +
    normalizeValue(lastNPV) +
    normalizeValue(lastNPVigst) +
    normalizeValue(lastNPVtotalBenifit) +
    normalizeValue(lastNPVF) +
    normalizeValue(lastNPV2) +
    normalizeValue(lastNPVigst2) +
    normalizeValue(lastNPVrodtep);
  console.log(
    "totalDuty,RowTwoThirdCell,totalSavings,lastNPV,lastNPVigst,lastNPVtotalBenifitlastNPVF,lastNPV2,lastNPVigst2,lastNPVrodtep",
    totalDuty,
    RowTwoThirdCell,
    totalSavings,
    lastNPV,
    lastNPVigst,
    lastNPVtotalBenifit,
    lastNPVF,
    lastNPV2,
    lastNPVigst2,
    lastNPVrodtep
  );
  let NetBeniftForEOU =
    normalizeValue(totalDuty) +
    normalizeValue(EOUValue) +
    normalizeValue(totalSavings) +
    normalizeValue(DutySavedOnDomesticalyProcuredCP) +
    normalizeValue(lastNPV) +
    normalizeValue(lastNPVigst) +
    normalizeValue(lastNPVF) +
    normalizeValue(lastNPVigst2) +
    normalizeValue(lastNPV3) +
    normalizeValue(lastNPVtotalBenifit);
  console.log(
    "totalDuty,EOUValue,totalSavings,DutySavedOnDomesticalyProcuredCP,lastNPV,lastNPVigst,lastNPVF,lastNPVigst2,lastNPV3,lastNPVtotalBenifit",
    totalDuty,
    EOUValue,
    totalSavings,
    DutySavedOnDomesticalyProcuredCP,
    lastNPV,
    lastNPVigst,
    lastNPVF,
    lastNPVigst2,
    lastNPV3,
    lastNPVtotalBenifit
  );


let NetBeniftForSEZ =
  normalizeValue(totalDuty) +
  normalizeValue(EOUValue) +
  normalizeValue(totalSavings) +
  normalizeValue(AIRAccuredOnDTA) +
  normalizeValue(DutySavedOnDomesticalyProcuredCPNetAIR) +
  normalizeValue(lastNPV) +
  normalizeValue(lastNPVigst) +
  normalizeValue(lastNPV2) +
  normalizeValue(lastNPVF) +
  normalizeValue(lastNPVigst2) +
  normalizeValue(lastNPVDRM) +
  normalizeValue(DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR) +
  normalizeValue(lastNpvIGST) +
  normalizeValue(lastNPVtotalBenifit) +
  normalizeValue(gstOnConstruction) +
  normalizeValue(constOfDuty) +
  normalizeValue(lastNPVigst1) +
  normalizeValue(lastNPVigst5);

  console.log(
    "totalDuty,EOUValue,totalSavings,AIRAccuredOnDTA,DutySavedOnDomesticalyProcuredCPNetAIR,lastNPV,lastNPVigst,lastNPV2,lastNPVF,lastNPVigst2,lastNPVDRM,DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR,lastNpvIGST,lastNPVtotalBenifit,gstOnConstruction,constOfDuty,lastNPVigst1,lastNPVigst5",
    totalDuty,
    EOUValue,
    totalSavings,
    AIRAccuredOnDTA,
    DutySavedOnDomesticalyProcuredCPNetAIR,
    lastNPV,
    lastNPVigst,
    lastNPV2,
    lastNPVF,
    lastNPVigst2,
    lastNPVDRM,
    DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR,
    lastNpvIGST,
    lastNPVtotalBenifit,
    gstOnConstruction,
    constOfDuty,
    lastNPVigst1,
    lastNPVigst5
  );

  console.log("NetBeniftForAA", NetBeniftForAA);
  console.log("NetBeniftForBR", NetBeniftForBR);
  console.log("NetBeniftForMOOWR", NetBeniftForMOOWR);
  console.log("NetBeniftForEOU", NetBeniftForEOU);
  console.log("NetBeniftForSEZ", NetBeniftForSEZ);

  updatePDFAndDownload(
    // first row
    totalDuty,
    // second row
    EPCGValue,
    RowTwoThirdCell,
    EOUValue,
    // third row
    totalSavings,
    // fourth row
    AIRAccuredOnDTA,
    // fifth row
    DutySavedOnDomesticalyProcuredCP,
    DutySavedOnDomesticalyProcuredCPNetAIR,
    // sixth row
    DCGValue,
    // Seventh row
    lastNPV,
    // eighth row
    lastNPVigst,
    // Ninth row
    // lastNPVRawDuty,
    lastNPVF,
    // Tenth row
    lastNPV2,
    // eleventh row
    lastNPVigst2,
    // twelveth row
    lastNPVDRM,
    // thirteenth row
    lastNPV3,
    DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR,
    // fourteen row
    lastNpvIGST,
    // Fifteen row
    lastNPVrodtep,
    // sixteenth row
    lastNPVtotalBenifit,
    // seventeenth row
    gstOnConstruction,
    // eighteenth row
    constOfDuty,
    // nineteenth row
    lastNPVigst1,
    // Twnenty row
    lastNPVigst5,
    // twenty first row
    NetBeniftForAA,
    NetBeniftForBR,
    NetBeniftForMOOWR,
    NetBeniftForEOU,
    NetBeniftForSEZ
  );
}

async function updatePDFAndDownload(
  value0,
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  value7,
  value8,
  value9,
  value10,
  value11,
  value12,
  value13,
  value14,
  value15,
  value16,
  value17,
  value18,
  value19,
  value20,
  value21,
  value22,
  value23,
  value24,
  value25,
  value26,
  value27,
  value28
) {
  console.log("value8", value8);
  console.log(
    value0,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    value10,
    value11,
    value12,
    value13,
    value14,
    value15,
    value16,
    value17,
    value18,
    value19,
    value20,
    value21,
    value22,
    value23,
    value24,
    value25,
    value26,
    value27,
    value28
  );
  const baseValues = {
    AA: value24,
    BR: value25,
    MOOWR: value26,
    EOU: value27,
    SEZ: value28,
  };

  const X = value3;

  const keysAll = ["AA", "BR", "MOOWR", "EOU", "SEZ"];
  const keys = X === "N/A" ? ["AA", "BR", "MOOWR"] : keysAll;

  function getCombinations(arr, size) {
    const result = [];

    function backtrack(start = 0, combo = []) {
      if (combo.length === size) {
        result.push([...combo]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        combo.push(arr[i]);
        backtrack(i + 1, combo);
        combo.pop();
      }
    }

    backtrack();

    return result;
  }

  function findFinalFile(values, keys) {
    for (let size = keys.length; size >= 1; size--) {
      const combos = getCombinations(keys, size);
      for (const combo of combos) {
        const valList = combo.map((k) => values[k]);
        const maxVal = Math.max(...valList);

        const allSameMax = valList.every((v) => v === maxVal);

        const otherKeys = keys.filter((k) => !combo.includes(k));
        const maxOutside = otherKeys.length
          ? Math.max(...otherKeys.map((k) => values[k]))
          : -Infinity;
        const isTrulyMax = maxVal >= maxOutside;

        if (allSameMax && isTrulyMax) {
          return {
            fileName: combo.slice().sort().join("_") + ".pdf",
            maxValue: maxVal,
            keys: combo,
          };
        }
      }
    }
    return null;
  }
  const result = findFinalFile(baseValues, keys);
  console.log("result", result);
  let url = "reports/" + result.fileName;
  // let url = "reports/AA.pdf";
  console.log("url", url);
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  isNaN(value2) ? (value2 = 0) : (value2 = value2);
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const reportTitle = `Report ${month} - ${year}`;
  console.log("reportTitle", reportTitle);
  const firstPage = pdfDoc.getPages()[0];
  const secondPage = pdfDoc.getPages()[2];
  const thirdPage = pdfDoc.getPages()[3];
  const helveticaBoldFont = await pdfDoc.embedFont(
    PDFLib.StandardFonts.HelveticaBold
  );
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica); // Regular

  // Write dynamic title to PDF
  firstPage.drawText(reportTitle, {
    x: 50,
    y: 340,
    size: 24,
    font: helveticaBoldFont,
    color: PDFLib.rgb(1, 0, 0),
  });

  // First Row
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 510,
    y: 430,
    size: 10,
    length: 20,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 585,
    y: 430,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 655,
    y: 430,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value0).toString(),
    {
      x: 720,
      y: 430,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value0).toString(),
    {
      x: 785,
      y: 430,
      size: 10,
      font: font,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Second Row

  secondPage.drawText(formatNumberPDF(value1).toString(), {
    x: 510,
    y: 412,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value1).toString(), {
    x: 585,
    y: 412,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value2).toString(), {
    x: 655,
    y: 412,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value3).toString(),
    {
      x: 720,
      y: 412,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value3).toString(),
    {
      x: 785,
      y: 412,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Third Row
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 510,
    y: 394,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 585,
    y: 394,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 655,
    y: 394,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value4).toString(),
    {
      x: 720,
      y: 394,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value4).toString(),
    {
      x: 785,
      y: 394,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Fourth Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 510,
    y: 357,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 357,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 655,
    y: 357,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 720,
    y: 357,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value5).toString(),
    {
      x: 785,
      y: 357,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Fifth Row
  secondPage.drawText(formatNumberPDF(value6).toString(), {
    x: 510,
    y: 338,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value6).toString(), {
    x: 585,
    y: 338,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 655,
    y: 338,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText("*".toString(), {
    x: 672,
    y: 334,
    size: 20,
    color: PDFLib.rgb(1, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value6).toString(),
    {
      x: 720,
      y: 338,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value7).toString(),
    {
      x: 785,
      y: 338,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Sixth Row
  secondPage.drawText(formatNumberPDF(value8).toString(), {
    x: 510,
    y: 320,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value8).toString(), {
    x: 585,
    y: 320,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 655,
    y: 320,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 720,
    y: 320,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 785,
    y: 320,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Seventh Row
  secondPage.drawText(formatNumberPDF(value9).toString(), {
    x: 510,
    y: 275,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 275,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value9).toString(), {
    x: 655,
    y: 275,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value9).toString(),
    {
      x: 720,
      y: 275,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value9).toString(),
    {
      x: 785,
      y: 275,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Eighth Row
  secondPage.drawText(formatNumberPDF(value10).toString(), {
    x: 510,
    y: 245,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 245,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value10).toString(), {
    x: 655,
    y: 245,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value10).toString(),
    {
      x: 720,
      y: 245,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value10).toString(),
    {
      x: 785,
      y: 245,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Ninth Row
  secondPage.drawText(formatNumberPDF(value11).toString(), {
    x: 510,
    y: 227,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value11).toString(), {
    x: 585,
    y: 227,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value11).toString(), {
    x: 655,
    y: 227,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value11).toString(),
    {
      x: 720,
      y: 227,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value11).toString(),
    {
      x: 785,
      y: 227,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  //tenth Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 510,
    y: 185,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 185,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value12).toString(), {
    x: 655,
    y: 185,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 720,
    y: 185,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value12).toString(),
    {
      x: 785,
      y: 185,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Eleventh Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 510,
    y: 162,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 162,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value13).toString(), {
    x: 655,
    y: 162,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value13).toString(),
    {
      x: 720,
      y: 162,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value13).toString(),
    {
      x: 785,
      y: 162,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Twelth Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 510,
    y: 125,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 125,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 655,
    y: 125,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 720,
    y: 125,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value14).toString(),
    {
      x: 785,
      y: 125,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Thirteen Row
  secondPage.drawText(formatNumberPDF(value15).toString(), {
    x: 510,
    y: 107,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value15).toString(), {
    x: 585,
    y: 107,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText("N/A".toString(), {
    x: 655,
    y: 107,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText("*".toString(), {
    x: 672,
    y: 103,
    size: 20,
    color: PDFLib.rgb(1, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value15).toString(),
    {
      x: 720,
      y: 107,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value16).toString(),
    {
      x: 785,
      y: 107,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Fourteen Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 510,
    y: 88,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 88,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 655,
    y: 88,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 720,
    y: 88,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value17).toString(),
    {
      x: 785,
      y: 88,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Export Incentive
  // Fifteen Row
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 510,
    y: 494,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("0.00").toString(), {
    x: 585,
    y: 494,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 655,
    y: 494,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value18).toString(),
    {
      x: 720,
      y: 494,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value18).toString(),
    {
      x: 785,
      y: 494,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Sixteen Row
  thirdPage.drawText(formatNumberPDF(value19).toString(), {
    x: 510,
    y: 475,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF(value19).toString(), {
    x: 575,
    y: 475,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF(value19).toString(), {
    x: 645,
    y: 475,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value19).toString(),
    {
      x: 710,
      y: 475,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value19).toString(),
    {
      x: 775,
      y: 475,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // SEZ Specific
  // Seventeen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 510,
    y: 438,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 438,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 655,
    y: 438,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 720,
    y: 438,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value20).toString(),
    {
      x: 785,
      y: 438,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Eighteen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 510,
    y: 420,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 420,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 655,
    y: 420,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 720,
    y: 420,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value21).toString(),
    {
      x: 785,
      y: 420,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // nineteen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 510,
    y: 401,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 401,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 655,
    y: 401,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 720,
    y: 401,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value22).toString(),
    {
      x: 785,
      y: 401,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // Twenty Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 510,
    y: 383,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 585,
    y: 383,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 655,
    y: 383,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 720,
    y: 383,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value23).toString(),
    {
      x: 785,
      y: 383,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );

  // TwentyFirst Row
  thirdPage.drawText(formatNumberPDF(value24).toString(), {
    x: 510,
    y: 363,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF(value25).toString(), {
    x: 585,
    y: 363,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF(value26).toString(), {
    x: 655,
    y: 363,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value27).toString(),
    {
      x: 720,
      y: 363,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value28).toString(),
    {
      x: 785,
      y: 363,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  const pdfBytes = await pdfDoc.save();
  localStorage.setItem("sharedPDF", JSON.stringify(Array.from(pdfBytes)));

  // Create blob from bytes
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(pdfBlob);

  let modifiedPdfUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`;

  const newTab = window.open("", "_blank");

  if (!newTab) {
    alert("Popup blocked! Please allow popups for this site.");
    return;
  }

  newTab.document.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Optitx's Report</title>
      <!-- Link to external CSS file -->
      <link rel="stylesheet" href="css/style.css">
      <link rel="shortcut icon" href="https://optitaxs.com/wp-content/uploads/2022/06/cropped-favicon-192x192.png" type="image/x-icon" />
      <style>
        /* In-line styles if needed to override or add specific styles for the new tab's content */
        iframe {
             width: 60%;
             height: 550px;
             box-sizing: border-box;
             padding: 20px;
        }
          #toolbar{
          height: 60px;
          background-image: linear-gradient(rgba(37, 0, 110, 1), rgba(22, 0, 66, 1));
          display: flex;
          justify-content: center;
          gap: 50px;
          align-items: center;
        }
          button{
              padding: 10px;
              width: 100px;
              border: 0;
              border-radius: 8px;
              cursor: pointer;
              font-size: 16px;
              font-weight: 600;
          }
          main{
          display:flex;
          font-family: "Open Sans";
          }

          aside{
          width:40%;
          height:100dvh;
          }
}
    aside.upcoming-tools {
    background: linear-gradient(135deg, #f0f4f8, #ffffff);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    padding: 20px;
    max-width: 300px;
    font-family: 'Segoe UI', sans-serif;
  }

  aside.upcoming-tools h2 {
    font-size: 1.4em;
    margin-bottom: 15px;
    color: #333;
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
  }

  .tool {
    margin-bottom: 15px;
    padding: 10px;
    border-left: 4px solid #4a90e2;
    background-color: #f9fbfd;
    border-radius: 6px;
    transition: background-color 0.3s ease;
  }

  .tool:hover {
    background-color: #eef5fc;
  }

  .tool-title {
    font-weight: bold;
    color: #2c3e50;
  }

  .tool-date {
    font-size: 0.85em;
    color: #7f8c8d;
  }
    @media (max-width: 600px){
  main{     
  display: flex;
    font-family: "Open Sans";
    flex-direction: column;
    width: 100%;
  }
    aside{
          width:100%;
          height:400px;
          }

    iframe {
   width: 100%;
    height: 400px;
    box-sizing: border-box;
    padding: 20px;
  }

  }
      </style>
    </head>
    <body>
      <div id="toolbar">
        <button onclick="downloadPDF()">Download</button>
      </div>
      <main>
      <iframe id="pdfFrame" src="${modifiedPdfUrl}"></iframe>
     <aside class="upcoming-tools">
  <h2>Upcoming Tools</h2>
  <div class="tool">
    <div class="tool-title">Decision Navigator(Ethanol Calculator)</div>
    <div class="tool-date">Launching Soon</div>
  </div>
  <div class="tool">
    <div class="tool-title">MOOWR Calculator</div>
    <div class="tool-date">Launching Soon</div>
  </div>
  <div class="tool">
    <div class="tool-title">Real-Time Calculation with AI</div>
    <div class="tool-date">Launching Soon</div>
  </div>
</aside>
      </main>
      <!-- Feedback Form -->
      <div id="custom-feedback-modal" class="modal-container">
        <div class="modal-box">
          <form action="https://formsubmit.co/sushant.atram@optitaxs.com" method="POST" id="feedback-form" class="feedback-form">
            <h2 class="form-title">We'd Love Your Feedback!</h2>
        
           <div class="form-group2">
                  <label for="user-name" class="form-label">Name</label>
                  <input type="text" id="user-name" autocomplete="on" name="name" class="form-input" placeholder="Enter your name" required />
              </div>
          
              <div class="form-group2">
                  <label for="user-email" class="form-label">Email</label>
                  <input type="email" id="user-email" autocomplete="on" name="email" class="form-input" placeholder="Enter your email" required />
              </div>
          
              <fieldset class="form-group">
                <legend class="form-label">How was your experience with MOOWR Utility?</legend>
                  <div class="input-q">
                    <label><input type="checkbox" name="experience" value="Great" onclick="onlyOne(this)"> Great</label>
                    <label><input type="checkbox" name="experience" value="Good" onclick="onlyOne(this)"> Good</label>
                    <label><input type="checkbox" name="experience" value="Average" onclick="onlyOne(this)"> Average</label>
                    <label><input type="checkbox" name="experience" value="Needs Improvement" onclick="onlyOne(this)"> Needs Improvement</label>
                  </div>
              </fieldset>



          
              <div class="form-group">
                  <label for="user-feedback" class="form-label">Additional Feedback</label>
                  <textarea id="user-feedback" name="feedback" class="form-input" rows="4" placeholder="Share your thoughts..." required></textarea>
              </div>
          
              <div class="form-group">
                  <label for="newsletter-opt-in" class="form-label">Subscribe to our Newsletter?</label>
                  <div class="checkbox-wrapper">
                      <input type="checkbox" id="newsletter-opt-in" name="subscribeNewsletter" class="form-checkbox" />
                      <label for="newsletter-opt-in">Yes, I want to stay updated!</label>
                  </div>
              </div>

            <!-- Hidden Fields for FormSubmit -->
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_autoresponse" value="Thank you for your feedback!">
            <input type="hidden" name="_next" value="https://hackyvirus.github.io/Optii-Savr">
        
            <!-- Submit and Skip Buttons -->
            <div class="submit-skip">
              <div class="skip-btn" id="skip">Skip and Download</div>
              <button type="submit" id="submit-download" class="submit-btn">Submit & Download Report</button>
            </div>
          </form>
        </div>
      </div>

<script>
  function downloadPDF() {
    document.getElementById("custom-feedback-modal").style.display = "block";
  }

  let blobURLFromStorage = null;

  const stored = localStorage.getItem("sharedPDF");
  if (stored) {
    const byteArray = new Uint8Array(JSON.parse(stored));
    const blob = new Blob([byteArray], { type: "application/pdf" });
    blobURLFromStorage = URL.createObjectURL(blob);
    const frame = document.getElementById("pdfFrame");
    if (frame) {
      frame.src = blobURLFromStorage + "#toolbar=0&navpanes=0&scrollbar=0";
    }
  }

  function downloadPDF1() {
    const downloadUrl = blobURLFromStorage || document.getElementById('pdfFrame').src;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = "Optitx's Report.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(function () {
      if (window.opener && !window.opener.closed) {
        window.opener.location.reload();
      }
      window.close();
    }, 1000);
    localStorage.removeItem("sharedPDF");
  }

  document.getElementById("skip").addEventListener("click", function () {
    document.getElementById("custom-feedback-modal").style.display = "none";
    downloadPDF1();
  });

  document.getElementById("submit-download").addEventListener("click", function () {
    document.getElementById("custom-feedback-modal").style.display = "none";
    downloadPDF1();
    setTimeout(function () {
      location.reload();
    }, 5000);
  });
  function onlyOne(checkbox) {
    const checkboxes = document.getElementsByName('experience');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkbox) {
            checkboxes[i].checked = false;
        }
    }
}

</script>
    </body>
  </html>
`);
  newTab.document.close();
}
