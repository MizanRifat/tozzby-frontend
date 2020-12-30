import React, { useState, useEffect,useReducer } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import { useQueryState } from "react-router-use-location-state";
import { Slider, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    radioRoot: {
        padding: "0px 9px !important",
    },
    formlabel: {
        color: "unset",
        borderBottom: "1px solid red",
        paddingBottom: "8px",
    },
    loadBtn:{
        width:'100%',
        borderRadius:0
    }
}));

export default function CategorySidebar({
    maxprice,
    attributes,
    search,
    setPageQry,
    setOpen
}) {
    return (
        <div style={{padding:'10px',background:'#f4f4f4'}}>
            <PriceSort maxprice={maxprice} setOpen={setOpen} />
            {attributes.map(
                (attribute, index) =>
                    attribute.type == "select" && (
                        <div className="my-2">
                            <Section
                                attribute={attribute}
                                queryName={attribute.code}
                                search={search}
                                setPageQry={setPageQry}
                                setOpen={setOpen}
                            />
                        </div>
                    )
            )}
        </div>

    );
}

function PriceSort({ maxprice,setOpen }) {
    const classes = useStyles();

    const [sliderValue, setSliderValue] = useState([0, maxprice]);

    const [query, setQuery] = useQueryState("price", "");

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const handleClick = () => {
        setQuery(`${sliderValue[0]},${sliderValue[1]}`);
        setOpen(false)
    };

    return (

        <div style={{ marginBottom: "1rem" }}>
            <p className={classes.formlabel} style={{ fontSize: "16px" }}>
                Price
            </p>

            <div style={{ marginTop: "45px", textAlign: "center" }}>
                <Slider
                    style={{ width: "85%" }}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    max={maxprice}
                    valueLabelDisplay="on"
                />
            </div>

            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleClick}
            >
                Filter
            </Button>
        </div>
    );
}

function Section({ attribute, queryName, search, setPageQry,setOpen }) {

    const classes = useStyles();
    const [value, setValue] = useState("");
    const qry = new URLSearchParams(search);

    const reducer = (state,action)=>{
      switch (action.type) {
        case "SHOW_MORE":
            return {
                ...state,
                state:2,
                currentAttributeOptions:attribute.options
            }
        case "SHOW_LESS":
            return {
                ...state,
                state:1,
                currentAttributeOptions:attribute.options.slice(0,5)
            }
        default:
          return state;
      }
    }

    const [moreBtn, moreBtnDisapatch] = useReducer(reducer,{
        show:attribute.options.length > 6,
        state:1, //1=more 2-less
        currentAttributeOptions:attribute.options.slice(0,5)
    })

    const [query, setQuery] = useQueryState(queryName, "");

    const handleChange = (event) => {
        setPageQry("");
        if (event.target.value == 0) {
            setQuery("");
        } else {
            setQuery(event.target.value);
        }
        setValue(parseInt(event.target.value));
        setOpen(false)
    };

    const handleLoadBtnClick = () => {
      if(moreBtn.state == 1){
        moreBtnDisapatch({
          type:'SHOW_MORE'
        })
      }else {
        moreBtnDisapatch({
          type:'SHOW_LESS'
        })
      }
    }

    useEffect(() => {
        if (qry.get(queryName) != null) {
            setValue(parseInt(qry.get(queryName)));
        } else {
            setValue(0);
        }
    }, []);

    return (
        <>
        <FormControl component="fieldset" style={{ width: "100%" }}>
            <FormLabel component="legend" className={classes.formlabel}>
                {attribute.name}
            </FormLabel>
            <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    value={0}
                    control={<Radio size="small" classes={{ root: classes.radioRoot }} />}
                    label="All"
                />
                {moreBtn.currentAttributeOptions
                    .filter((item) => item.label != "")
                    .map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={option.id}
                            control={
                                <Radio size="small" classes={{ root: classes.radioRoot }} />
                            }
                            label={option.label}
                        />
                    ))}
            </RadioGroup>
        </FormControl>

        {
          moreBtn.show &&

              <Button variant='outlined' color='primary' className={classes.loadBtn} onClick={handleLoadBtnClick} size='small'>
                {
                    moreBtn.state == 1 ? 'Show More' : 'show less'
                }
              </Button>
        }
        </>
    );
}
