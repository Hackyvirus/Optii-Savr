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
      if (h == 84) {
        result = value * (h / 100);
      }
    }
    if (Q >= 5 && Q <= 12) {
      P = 3;
      h -= P;
      if (h == 72 || h == 60) {
        result = value * (h / 100);
      }
    }
    if (Q >= 13 && Q <= 20) {
      P = 2.5;
      h -= P;
      if (h == 50 || h == 40) {
        result = value * (h / 100);
      }
    }
    if (Q >= 21 && Q <= 40) {
      P = 2;
      h -= P;
      if (h == 32 || h == 24 || h == 16 || h == 8 || h == 0) {
        result = value * (h / 100);
      }
    }
  }
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

  // Gross Value of Raw Material iMPORTED 2
  GrossRawCIF2 = safeParseFloat(
    document.getElementById("first-left-input22").value
  );
  GrossRawBCD2 = safeParseFloat(
    document.getElementById("first-right-input22").value
  );
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
  // total calculation
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

  // scenario 1A (applicable where EO in case of EPCG is completed within six years
  if (ExportObligationForEPCG < TotalExportForSixYears) {
    EPCGValue = "Nil";
  }
  // scenario 1B (applicable where EO in case of EPCG is partially complete)
  if (ExportObligationForEPCG > TotalExportForSixYears) {
    let unfulfilledEO = ExportObligationForEPCG - TotalExportForSixYears;
    let ratioOfUnfulfilledEO = (unfulfilledEO / ExportObligationForEPCG) * 100;
    let unfulfilledEOUnderEPCG = (totalDuty * ratioOfUnfulfilledEO) / 100;
    let IGSTPayableatSeventhYear = (grossIGST * ratioOfUnfulfilledEO) / 100;
    let EPCGInterest =
      (((unfulfilledEOUnderEPCG + IGSTPayableatSeventhYear) * 15) / 100) * 7;
    let totalCostOfRedemption = unfulfilledEOUnderEPCG + EPCGInterest;
    let NPVOFcostofRedemption = CalculateNPV(
      totalCostOfRedemption,
      rateOfInterest,
      7
    );
    EPCGValue = NPVOFcostofRedemption * -1;
  }

  // 3) MOOWR Value (Row 2(Third Cell))
  // scenario 1 A (Sale In DTA)
  let RowTwoThirdCell = 0;
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

  // 4) EOU Value(Row 2(Fourth & Fifth Cell))
  let EOUValue = "N/A";

  let NFE = TotalExport - TotalImport;
  if (NFE < 0) {
    EOUValue = "N/A";
  } else if (NFE > 0 && grossIntendedPeriod < 10) {
    let totalDutyDepre = calculateDepreciationValue(
      totalDuty,
      grossIntendedPeriod
    );
    EOUValue =
      CalculateNPV(totalDutyDepre, rateOfInterest, grossIntendedPeriod) * -1;
  } else if (NFE > 0 && grossIntendedPeriod >= 10) {
    EOUValue = 0;
  } else {
    EOUValue = "N/A";
  }
  let totalSavings =
    safeParseFloat(grossIGST) *
    (safeParseFloat(rateOfInterest) / 100) *
    (safeParseFloat(timeGap) / 365);

  // Domestically procured capital goods
  const AIRAccuredOnDTA = (domesticCapitalGoods * 1.5) / 100;
  let DutySavedOnDomesticalyProcuredCPNetAIR;
  // for EPCG, BR, EOU
  const DutySavedOnDomesticalyProcuredCP =
    grossBCD2 + GrossSWS2 + grossAIDC2 + grossADD2 + grossSGD2 + grossCWD2;
  // for SEZ
  DutySavedOnDomesticalyProcuredCPNetAIR =
    DutySavedOnDomesticalyProcuredCP - AIRAccuredOnDTA;

  let DCGValue = 0;
  let DCG = domesticCapitalGoods;
  let BCDISWS = domesticCapitalGoods * (11 / 100);
  let DCGANDBCDISWSIGST = (DCG + BCDISWS) * (18 / 100);
  let TOTALDUTYINCLUDINGIGST = BCDISWS + DCGANDBCDISWSIGST;
  let EOFORDCG = TOTALDUTYINCLUDINGIGST * 6;
  if (EOFORDCG > TotalExportForSixYears) {
    let unfulfilledEOFORDCG = EOFORDCG - TotalExportForSixYears;

    let ratioOfUnfulfilledFORDCG = (unfulfilledEOFORDCG / EOFORDCG) * 100;

    let DOCOTIGSTPAEO7Y = BCDISWS * (ratioOfUnfulfilledFORDCG / 100);

    let IGSTPayableatSeventhYear =
      (DCGANDBCDISWSIGST * ratioOfUnfulfilledFORDCG) / 100;

    let DCGInterest =
      (((DOCOTIGSTPAEO7Y + IGSTPayableatSeventhYear) * 15) / 100) * 7;

    let totalCostOfRedemption = DOCOTIGSTPAEO7Y + DCGInterest;
    let NPVOFcostofRedemption = CalculateNPV(
      totalCostOfRedemption,
      rateOfInterest,
      7
    );
    DCGValue = NPVOFcostofRedemption;
  }

  // Imported raw materials (for exports, SEZ supplies & deemed export)
  let RawTotalDuty = CalculateDuty(
    safeParseFloat(GrossRawBCD),
    safeParseFloat(GrossRawSWS),
    safeParseFloat(GrossRawAIDC),
    safeParseFloat(GrossRawADD),
    safeParseFloat(GrossRawSGD),
    safeParseFloat(GrossRawCWD)
  );

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

  let RawTotalDuty2 =
    safeParseFloat(GrossRawBCD2) +
    safeParseFloat(GrossRawSWS2) +
    safeParseFloat(GrossRawAIDC2) +
    safeParseFloat(GrossRawADD2) +
    safeParseFloat(GrossRawSGD2) +
    safeParseFloat(GrossRawCWD2);

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

  let Digst2 = 0;
  let totalBenifitigst2 = 0;
  let lastNPVigst2 = 0;
  let npvigst2;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifitigst2 =
      safeParseFloat(GrossRawIGST2) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
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

  let RawTotalDuty3 =
    safeParseFloat(GrossRawDomesticBCD) +
    safeParseFloat(GrossRawDomesticSWS) +
    safeParseFloat(GrossRawDomesticAIDC) +
    safeParseFloat(GrossRawDomesticADD) +
    safeParseFloat(GrossRawDomesticSGD) +
    safeParseFloat(GrossRawDomesticCWD);

  // Domestic Raw Materials
  const AIRAccuredOnDTARawMaterial = (DomesticRawMaterialValueSEZ * 1.5) / 100;
  const AIRAccuredOnDTARawMaterial2 =
    (DomesticRawMaterialValueDomesticSale * 1.5) / 100;
  let AIRAccuredOnTARawMaterial = CalculateDuty(
    AIRAccuredOnDTARawMaterial,
    AIRAccuredOnDTARawMaterial2
  );
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

  let DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR;
  const DutySavedOnDomesticalyProcuredCPRawMaterial =
    GrossRawDomesticBCD +
    GrossRawDomesticSWS +
    GrossRawDomesticAIDC +
    GrossRawDomesticADD +
    GrossRawDomesticSGD +
    GrossRawDomesticCWD;
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

  DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR = lastNPV3 - lastNPVDRM;

  if (lastNPV3 > lastNPVDRM) {
    DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR =
      DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR;
  } else if (lastNPV3 < lastNPVDRM) {
    DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR = "N/A";
  }

  let igst = 0;
  let totalIgst = 0;
  let lastNpvIGST = 0;
  let NpvIgst;
  let CurrentIGST =
    ((DomesticRawMaterialValueSEZ + DomesticRawMaterialValueDomesticSale) *
      18) /
    100;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalIgst =
      safeParseFloat(CurrentIGST) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (igst == 0) {
      igst = 1 + safeParseFloat(rateOfInterest) / 100;
    } else {
      igst = igst * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    NpvIgst = totalIgst / igst;
    lastNpvIGST += NpvIgst;
    CurrentIGST =
      CurrentIGST * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }

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

    lastNPVrodtep += npv4;
    lastNPVtotalBenifit += npv5;

    totalBenifitrodtep =
      totalBenifitrodtep * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
    lastNPVradtepAndAir =
      lastNPVradtepAndAir * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  lastNPVrodtep = lastNPVrodtep;
  lastNPVtotalBenifit = lastNPVtotalBenifit;
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

  let ACDPODSBSEZU = domesticSales - GrossRawCIF2;
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

  function checkForValueLessthanZero(value) {
    if (value < 0) {
      return 0;
    }
    return value;
  }

  let NetBeniftForAA =
    normalizeValue(totalDuty) +
    normalizeValue(EPCGValue) +
    normalizeValue(totalSavings) +
    normalizeValue(DutySavedOnDomesticalyProcuredCP) +
    normalizeValue(DCGValue) +
    normalizeValue(lastNPV) +
    normalizeValue(lastNPVigst) +
    normalizeValue(lastNPVF) +
    normalizeValue(lastNPV3) +
    normalizeValue(lastNPVrodtep);
  NetBeniftForAA = checkForValueLessthanZero(NetBeniftForAA);

  let NetBeniftForBR =
    normalizeValue(totalDuty) +
    normalizeValue(EPCGValue) +
    normalizeValue(totalSavings) +
    normalizeValue(DutySavedOnDomesticalyProcuredCP) +
    normalizeValue(DCGValue) +
    normalizeValue(lastNPVF) +
    normalizeValue(lastNPV3) +
    normalizeValue(lastNPVrodtep);

  NetBeniftForBR = checkForValueLessthanZero(NetBeniftForBR);
  let NetBeniftForMOOWR =
    normalizeValue(totalDuty) +
    normalizeValue(RowTwoThirdCell) +
    normalizeValue(totalSavings) +
    normalizeValue(lastNPV) +
    normalizeValue(lastNPVigst) +
    normalizeValue(lastNPVF) +
    normalizeValue(lastNPV2) +
    normalizeValue(lastNPVigst2);
  NetBeniftForMOOWR = checkForValueLessthanZero(NetBeniftForMOOWR);

  let NetBeniftForEOU =
    normalizeValue(EOUValue == "N/A" ? 0 : totalDuty) +
    normalizeValue(EOUValue == "N/A" ? 0 : EOUValue) +
    normalizeValue(EOUValue == "N/A" ? 0 : totalSavings) +
    normalizeValue(EOUValue == "N/A" ? 0 : DutySavedOnDomesticalyProcuredCP) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPV) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVigst) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVF) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVigst2) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPV3) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVrodtep);
  NetBeniftForEOU = checkForValueLessthanZero(NetBeniftForEOU);

  let NetBeniftForSEZ =
    normalizeValue(EOUValue == "N/A" ? 0 : totalDuty) +
    normalizeValue(EOUValue == "N/A" ? 0 : EOUValue) +
    normalizeValue(EOUValue == "N/A" ? 0 : totalSavings) +
    normalizeValue(EOUValue == "N/A" ? 0 : AIRAccuredOnDTA) +
    normalizeValue(
      EOUValue == "N/A" ? 0 : DutySavedOnDomesticalyProcuredCPNetAIR
    ) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPV) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVigst) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVF) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPV2) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVigst2) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVDRM) +
    normalizeValue(
      EOUValue == "N/A" ? 0 : DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR
    ) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNpvIGST) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVrodtep) +
    normalizeValue(EOUValue == "N/A" ? 0 : gstOnConstruction) +
    normalizeValue(EOUValue == "N/A" ? 0 : constOfDuty) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVigst1) +
    normalizeValue(EOUValue == "N/A" ? 0 : lastNPVigst5);
  NetBeniftForSEZ = checkForValueLessthanZero(NetBeniftForSEZ);
  let NetBeniftForAIR =
    normalizeValue(totalDuty) +
    normalizeValue(EPCGValue) +
    normalizeValue(totalSavings) +
    normalizeValue(DutySavedOnDomesticalyProcuredCP) +
    normalizeValue(DCGValue) +
    normalizeValue(lastNPVrodtep) +
    normalizeValue(lastNPVtotalBenifit);
  NetBeniftForAIR = checkForValueLessthanZero(NetBeniftForAIR);

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
    NetBeniftForSEZ,
    NetBeniftForAIR
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
  value28,
  value29
) {
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
    value28,
    value29
  );
  const baseValues = {
    AA: value24,
    BR: value25,
    MOOWR: value26,
    EOU: value27,
    SEZ: value28,
    AIR: value29,
  };

  const X = value3;

  const keysAll = ["AA", "BR", "MOOWR", "EOU", "SEZ", "AIR"];
  const keys = X === "N/A" ? ["AA", "BR", "MOOWR", "AIR"] : keysAll;

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
  let url =
    "reports/" +
    result.fileName;
  console.log(url);
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  isNaN(value2) ? (value2 = 0) : (value2 = value2);
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const reportTitle = `Report ${month} - ${year}`;
  const firstPage = pdfDoc.getPages()[0];
  const secondPage = pdfDoc.getPages()[3];
  const thirdPage = pdfDoc.getPages()[4];
  const helveticaBoldFont = await pdfDoc.embedFont(
    PDFLib.StandardFonts.HelveticaBold
  );
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica); // Regular

  // Write dynamic title to PDF
  firstPage.drawText(reportTitle, {
    x: 45,
    y: 315,
    size: 24,
    font: helveticaBoldFont,
    color: PDFLib.rgb(1, 0, 0),
  });

  // First Row
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 435,
    y: 410,
    size: 10,
    length: 20,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 500,
    y: 410,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 575,
    y: 410,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value0).toString(),
    {
      x: 635,
      y: 410,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value0).toString(),
    {
      x: 695,
      y: 410,
      size: 10,
      font: font,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 760,
    y: 410,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Second Row

  secondPage.drawText(formatNumberPDF(value1).toString(), {
    x: 435,
    y: 392,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value1).toString(), {
    x: 500,
    y: 392,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value2).toString(), {
    x: 575,
    y: 392,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value3).toString(),
    {
      x: 635,
      y: 392,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value3).toString(),
    {
      x: 695,
      y: 392,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF(value1).toString(), {
    x: 760,
    y: 392,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Third Row
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 435,
    y: 373,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 500,
    y: 373,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 575,
    y: 373,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value4).toString(),
    {
      x: 635,
      y: 373,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value4).toString(),
    {
      x: 695,
      y: 373,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 760,
    y: 373,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Fourth Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 335,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 335,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 335,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 335,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value5).toString(),
    {
      x: 695,
      y: 335,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 335,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Fifth Row
  secondPage.drawText(formatNumberPDF(value6).toString(), {
    x: 435,
    y: 317,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value6).toString(), {
    x: 500,
    y: 317,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 317,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText("*".toString(), {
    x: 592,
    y: 313,
    size: 20,
    color: PDFLib.rgb(1, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value6).toString(),
    {
      x: 635,
      y: 317,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value7).toString(),
    {
      x: 695,
      y: 317,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF(value6).toString(), {
    x: 760,
    y: 317,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Sixth Row
  secondPage.drawText(formatNumberPDF(value8).toString(), {
    x: 435,
    y: 297,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value8).toString(), {
    x: 500,
    y: 297,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 297,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 297,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 695,
    y: 297,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value8).toString(), {
    x: 760,
    y: 297,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Seventh Row
  secondPage.drawText(formatNumberPDF(value9).toString(), {
    x: 435,
    y: 256,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 256,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value9).toString(), {
    x: 575,
    y: 256,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value9).toString(),
    {
      x: 635,
      y: 256,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value9).toString(),
    {
      x: 695,
      y: 256,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 256,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  // Eighth Row
  secondPage.drawText(formatNumberPDF(value10).toString(), {
    x: 435,
    y: 232,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 232,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value10).toString(), {
    x: 575,
    y: 232,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value10).toString(),
    {
      x: 635,
      y: 232,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value10).toString(),
    {
      x: 695,
      y: 232,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 232,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Ninth Row
  secondPage.drawText(formatNumberPDF(value11).toString(), {
    x: 435,
    y: 213,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value11).toString(), {
    x: 500,
    y: 213,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value11).toString(), {
    x: 575,
    y: 213,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value11).toString(),
    {
      x: 635,
      y: 213,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value11).toString(),
    {
      x: 695,
      y: 213,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 213,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  //tenth Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 172,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 172,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value12).toString(), {
    x: 575,
    y: 172,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 172,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value12).toString(),
    {
      x: 695,
      y: 172,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 172,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Eleventh Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 148,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 148,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value13).toString(), {
    x: 575,
    y: 148,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value13).toString(),
    {
      x: 635,
      y: 148,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value13).toString(),
    {
      x: 695,
      y: 148,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 148,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Twelth Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 111,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 111,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 111,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 111,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value14).toString(),
    {
      x: 695,
      y: 111,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 111,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Thirteen Row
  secondPage.drawText(formatNumberPDF(value15).toString(), {
    x: 435,
    y: 92,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText(formatNumberPDF(value15).toString(), {
    x: 500,
    y: 92,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText("N/A".toString(), {
    x: 575,
    y: 92,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  secondPage.drawText("*".toString(), {
    x: 592,
    y: 89,
    size: 20,
    color: PDFLib.rgb(1, 0, 0),
    font: font,
  });
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value15).toString(),
    {
      x: 635,
      y: 92,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value16).toString(),
    {
      x: 695,
      y: 92,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 92,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Fourteen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 472,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 472,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 472,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 472,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value17).toString(),
    {
      x: 695,
      y: 472,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 472,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Export Incentive
  // Fifteen Row
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 435,
    y: 435,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 500,
    y: 435,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 435,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value18).toString(),
    {
      x: 635,
      y: 435,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value18).toString(),
    {
      x: 695,
      y: 435,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 760,
    y: 435,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Sixteen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 416,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 416,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 416,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 416,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 695,
    y: 416,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF(value19).toString(), {
    x: 760,
    y: 416,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // SEZ Specific
  // Seventeen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 379,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 379,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 379,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 379,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value20).toString(),
    {
      x: 695,
      y: 379,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 379,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Eighteen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 360,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 360,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 360,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 360,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value21).toString(),
    {
      x: 695,
      y: 360,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 360,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // nineteen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 336,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 336,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 336,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 336,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value22).toString(),
    {
      x: 695,
      y: 336,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 336,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // Twenty Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 435,
    y: 314,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 500,
    y: 314,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 575,
    y: 314,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 635,
    y: 314,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value23).toString(),
    {
      x: 695,
      y: 314,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 760,
    y: 314,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });

  // TwentyFirst Row
  thirdPage.drawText(formatNumberPDF(value24).toString(), {
    x: 435,
    y: 295,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF(value25).toString(), {
    x: 500,
    y: 295,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(formatNumberPDF(value26).toString(), {
    x: 575,
    y: 295,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value27).toString(),
    {
      x: 635,
      y: 295,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(
    formatNumberPDF(value3 == "N/A" ? "N/A" : value28).toString(),
    {
      x: 695,
      y: 295,
      size: 10,
      color: PDFLib.rgb(0, 0, 0),
      font: font,
    }
  );
  thirdPage.drawText(formatNumberPDF(value29).toString(), {
    x: 760,
    y: 295,
    size: 10,
    color: PDFLib.rgb(0, 0, 0),
    font: font,
  });
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
            <input type="hidden" name="_next" value="https://optitaxs.com/optii-savr-calculator/">
        
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
