const covid19ImpactEstimator = (data) => {
    const currentlyInfected = data.reportedCases * 10;
    const sCurrentlyInfected = data.reportedCases * 50;
    const totalBed = data.totalHospitalBeds;
    const avgIncome = data.region.avgDailyIncomeInUSD;
    const avgIncPop = data.region.avgDailyIncomePopulation;
  
    let daysValue = data.timeToElapse;
    let dollarsInFlight;
    let sDollarsInFlight;
    if yarn (data.periodType === 'weeks') {
        daysValue *= 7;
      }
      if (data.periodType === 'months') {
        daysValue *= 30;
      }
    
      const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(daysValue / 3));
      const sInfectionsByRequestedTime = sCurrentlyInfected * (2 ** Math.floor(daysValue / 3));
    
      const severeCasesByRequestedTime = Math.floor(0.15 * infectionsByRequestedTime);
    
      const sSevereCasesByRequestedTime = Math.floor(
        0.15 * sInfectionsByRequestedTime
      );
    
      const hospitalBedsByRequestedTime = Math.round(0.35 * totalBed) - severeCasesByRequestedTime;
    
      const sBedsByRequestedTime = Math.round(0.35 * totalBed) - sSevereCasesByRequestedTime;
    
      const casesForICUByRequestedTime = Math.floor(0.05 * infectionsByRequestedTime);
      const sCasesForICUByRequestedTime = Math.floor(
        0.05 * sInfectionsByRequestedTime
      );
    
      const casesForVentilatorsByRequestedTime = Math.floor(
        0.02 * infectionsByRequestedTime
      );
    
      const sCasesForVentilatorsByRequestedTime = Math.floor(
        0.02 * sInfectionsByRequestedTime
      );
    
      dollarsInFlight = infectionsByRequestedTime * avgIncPop * avgIncome * daysValue;
      dollarsInFlight = parseFloat(dollarsInFlight.toFixed(2));
    
      sDollarsInFlight = sInfectionsByRequestedTime * avgIncPop * avgIncome * daysValue;
      sDollarsInFlight = parseFloat(sDollarsInFlight.toFixed(2));
    
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
        },
        severeImpact: {
          currentlyInfected: sCurrentlyInfected,
          infectionsByRequestedTime: sInfectionsByRequestedTime,
          severeCasesByRequestedTime: sSevereCasesByRequestedTime,
          hospitalBedsByRequestedTime: sBedsByRequestedTime,
          casesForICUByRequestedTime: sCasesForICUByRequestedTime,
          casesForVentilatorsByRequestedTime: sCasesForVentilatorsByRequestedTime,
          dollarsInFlight: sDollarsInFlight
        }
    
    
      };

}
    




export default covid19ImpactEstimator;
