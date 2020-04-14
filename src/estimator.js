const covid19ImpactEstimator = (data) => {
    const currentlyInfected = data.reportedCases * 10;
    const currentlyInfected_SI = data.reportedCases * 50;
    const totalBed = data.totalHospitalBeds;
    const avgIncome = data.region.avgDailyIncomeInUSD;
    const avgIncPop = data.region.avgDailyIncomePopulation;
  
    let daysValue = data.timeToElapse;
    let dollarsInFlight;
    let DollarsInFlight_SI;
    if (data.periodType === 'weeks') {
        daysValue *= 7;
      }
      if (data.periodType === 'months') {
        daysValue *= 30;
      }
    
      const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(daysValue / 3));
      const InfectionsByRequestedTime_SI = currentlyInfected_SI * (2 ** Math.floor(daysValue / 3));
    
      const severeCasesByRequestedTime = Math.floor(0.15 * infectionsByRequestedTime);
    
      const SevereCasesByRequestedTime_SI = Math.floor(
        0.15 * InfectionsByRequestedTime_SI
      );
    
      const hospitalBedsByRequestedTime = Math.round(0.35 * totalBed) - severeCasesByRequestedTime;
    
      const BedsByRequestedTime_SI = Math.round(0.35 * totalBed) - SevereCasesByRequestedTime_SI;
    
      const casesForICUByRequestedTime = Math.floor(0.05 * infectionsByRequestedTime);
      const CasesForICUByRequestedTime_SI = Math.floor(
        0.05 * InfectionsByRequestedTime_SI
      );
    
      const casesForVentilatorsByRequestedTime = Math.floor(
        0.02 * infectionsByRequestedTime
      );
    
      const CasesForVentilatorsByRequestedTime_SI = Math.floor(
        0.02 * InfectionsByRequestedTime_SI
      );
    
      dollarsInFlight = infectionsByRequestedTime * avgIncPop * avgIncome * daysValue;
      dollarsInFlight = parseFloat(dollarsInFlight.toFixed(2));
    
      DollarsInFlight_SI = InfectionsByRequestedTime_SI * avgIncPop * avgIncome * daysValue;
      DollarsInFlight_SI = parseFloat(DollarsInFlight_SI.toFixed(2));
    
      return {
        data: { ...data }, // the input data you got
    
        impact: {
          currentlyInfected,
          infectionsByRequestedTime,
          severeCasesByRequestedTime,
          hospitalBedsByRequestedTime,
          casesForICUByRequestedTime,
          casesForVentilatorsByRequestedTime,
          dollarsInFlight
        }, // your best case estimation
        severeImpact: {
          currentlyInfected: currentlyInfected_SI,
          infectionsByRequestedTime: InfectionsByRequestedTime_SI,
          severeCasesByRequestedTime: SevereCasesByRequestedTime_SI,
          hospitalBedsByRequestedTime: BedsByRequestedTime_SI,
          casesForICUByRequestedTime: CasesForICUByRequestedTime_SI,
          casesForVentilatorsByRequestedTime: CasesForVentilatorsByRequestedTime_SI,
          dollarsInFlight: DollarsInFlight_SI
        } // your severe case estimation
    
    
      };

}
    




export default covid19ImpactEstimator;
