import React from 'react'


function page1() {
  return (
    <div>
         <Grid sx={{ flexGrow: 1 }} container spacing={5} >
      <Grid item xs={12} sm={4} >
        <Card sx={{ minWidth: 250 , minHeight:100}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div style={{textAlign:'left'}}><b > Wheeled in solar </b> &nbsp;  &nbsp;   <p style={{textAlign:'right'}}>Status:</p> 
         </div>
        <hr/>
        </Typography>
         <Typography  variant="body2">
          Generation (kwh):
        </Typography>
        <Typography variant="body2">
          PR%:
        </Typography>
        <Typography variant="body2">
          Specific yield:
        </Typography>
        <Typography variant="body2">
          Irradiation: <b>{689.065186}</b>
        </Typography>
        <Typography  >
        <GaugeChart style={{width:"300",height:"150"}}
          id="gauge-chart3"
          nrOfLevels={40}
          colors={["green", "orange", "red"]}
          arcWidth={0.3}
          number={689.065186}
          textColor={'black'}
        />
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" > view graph</Button>
      </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={4} >
        <Card sx={{ minWidth: 250 , minHeight:70}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div style={{textAlign:'center'}}><b >Building Consumption</b> &nbsp;  &nbsp;
         </div>
        <hr/>
        </Typography>
        
        <Typography  >
        <PieChart style={{width:"170",height:"170"}}
  data={[
    { title: 'One', value: 70, color: '#E38627' },
    { title: 'Two', value: 29, color: '#C13C37' },
  ]}
/>  &nbsp;  &nbsp; <Typography variant="body2">
          Wheeled In Solar:
        </Typography>
        <Typography variant="body2">
          Diesel Rooftop:
        </Typography>

        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" > view graph</Button>
      </CardActions>
    </Card>
    </Grid>
  
    <Grid item xs={12} sm={4} >
        <Card sx={{ minWidth: 250 , minHeight:100}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div style={{textAlign:'center'}}><b > CO2 Reduction </b>
         </div>
        <hr/>
        </Typography>
         <Typography  variant="body2">
          <h4>Daily reduction in Emission: &nbsp; ----</h4>:
        </Typography>
        {/* <Typography variant="body2">
          PR%:
        </Typography>
        <Typography variant="body2">
          Specific yield:
        </Typography>
        <Typography variant="body2">
          Irradiation:
        </Typography> */}
        {/* <Typography  >
        <GaugeChart
          id="gauge-chart3
          nrOfLevels={10}
          colors={["green", "orange", "red"]}
          arcWidth={0.3}
          percent={0}
          textColor={'black'}
          // hideText={true} // If you want to hide the text
        />
        </Typography> */}
       
      </CardContent>
      <CardActions>
        <Button size="small" > view graph</Button>
      </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={4} >
        <Card sx={{ minWidth: 250 , minHeight:100}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div style={{textAlign:'left'}}><b > Wheeled in Wind</b> &nbsp;  &nbsp;   <p style={{textAlign:'right'}}>Status:</p> 
         </div>
        <hr/>
        </Typography>
         <Typography  variant="body2">
          Generation (kwh):
        </Typography>
        <Typography variant="body2">
          Wind Speed:
        </Typography>
        <Typography  >
          <h1>some text</h1>
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" > view graph</Button>
      </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={4} >
        <Card sx={{ minWidth: 250 , minHeight:100}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div style={{textAlign:'left'}}><b > Wheeled in solar </b> &nbsp;  &nbsp;   <p style={{textAlign:'right'}}>Status:</p> 
         </div>
        <hr/>
        </Typography>
         <Typography  variant="body2">
          Generation (kwh):
        </Typography>
        <Typography variant="body2">
          PR%:
        </Typography>
        <Typography variant="body2">
          Specific yield:
        </Typography>
        <Typography variant="body2">
          Irradiation:
        </Typography>
        <Typography  >
        <GaugeChart
          id="gauge-chart3"
          nrOfLevels={10}
          colors={["green", "orange", "red"]}
          arcWidth={0.3}
          percent={0}
          textColor={'black'}
          // hideText={true} // If you want to hide the text
        />
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" > view graph</Button>
      </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={4} >
        <Card sx={{ minWidth: 250 , minHeight:100}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div style={{textAlign:'left'}}><b > Wheeled in solar </b> &nbsp;  &nbsp;   <p style={{textAlign:'right'}}>Status:</p> 
         </div>
        <hr/>
        </Typography>
         <Typography  variant="body2">
          Generation (kwh):
        </Typography>
        <Typography variant="body2">
          PR%:
        </Typography>
        <Typography variant="body2">
          Specific yield:
        </Typography>
        <Typography variant="body2">
          Irradiation:
        </Typography>
        <Typography  >
        <GaugeChart
          id="gauge-chart3"
          nrOfLevels={10}
          colors={["green", "orange", "red"]}
          arcWidth={0.3}
          percent={0}
          textColor={'black'}
          // hideText={true} // If you want to hide the text
        />
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" > view graph</Button>
      </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={4} >
        <Card sx={{ minWidth: 250 , minHeight:100}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div style={{textAlign:'left'}}><b > Wheeled in solar </b> &nbsp;  &nbsp;   <p style={{textAlign:'right'}}>Status:</p> 
         </div>
        <hr/>
        </Typography>
         <Typography  variant="body2">
          Generation (kwh):
        </Typography>
        <Typography variant="body2">
          PR%:
        </Typography>
        <Typography variant="body2">
          Specific yield:
        </Typography>
        <Typography variant="body2">
          Irradiation:
        </Typography>
        <Typography  >
        <GaugeChart
          id="gauge-chart3"
          nrOfLevels={10}
          colors={["green", "orange", "red"]}
          arcWidth={0.3}
          percent={0}
          textColor={'black'}
          // hideText={true} // If you want to hide the text
        />
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" > view graph</Button>
      </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={4} >
        <Card sx={{ minWidth: 250 , minHeight:100}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div style={{textAlign:'left'}}><b > Wheeled in solar </b> &nbsp;  &nbsp;   <p style={{textAlign:'right'}}>Status:</p> 
         </div>
        <hr/>
        </Typography>
         <Typography  variant="body2">
          Generation (kwh):
        </Typography>
        <Typography variant="body2">
          PR%:
        </Typography>
        <Typography variant="body2">
          Specific yield:
        </Typography>
        <Typography variant="body2">
          Irradiation:
        </Typography>
        <Typography  >
        <GaugeChart
          id="gauge-chart3"
          nrOfLevels={10}
          colors={["green", "orange", "red"]}
          arcWidth={0.3}
          percent={0}
          textColor={'black'}
          // hideText={true} // If you want to hide the text
        />
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" > view graph</Button>
      </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={4} >
        <Card sx={{ minWidth: 250 , minHeight:100}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div style={{textAlign:'left'}}><b > Wheeled in solar </b> &nbsp;  &nbsp;   <p style={{textAlign:'right'}}>Status:</p> 
         </div>
        <hr/>
        </Typography>
         <Typography  variant="body2">
          Generation (kwh):
        </Typography>
        <Typography variant="body2">
          PR%:
        </Typography>
        <Typography variant="body2">
          Specific yield:
        </Typography>
        <Typography variant="body2">
          Irradiation:
        </Typography>
        <Typography  >
        <GaugeChart
          id="gauge-chart3"
          nrOfLevels={10}
          colors={["green", "orange", "red"]}
          arcWidth={0.3}
          percent={0}
          textColor={'black'}
          // hideText={true} // If you want to hide the text
        />
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" > view graph</Button>
      </CardActions>
    </Card>
    </Grid>
    
    
    
    
    </Grid>
   
    </div>
  )
}

export default page1



