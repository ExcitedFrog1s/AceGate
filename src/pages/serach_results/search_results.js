//
// Created by zyc on 2022/11/11.
//

import * as React from 'react';
import {Box} from "@chakra-ui/react";
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ResultCard from "./result_card";
import Filter from "./filter";



function Sort() {
    const [sort_order, setSortOrder] = React.useState('默认');

    const handleChange = (event: SelectChangeEvent) => {
        setSortOrder(event.target.value);
    };

    return(
        <Box float={'right'} mr={'20%'} mt={'-60'}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel >{'排序方式'}</InputLabel>
                <Select
                    value={sort_order}
                    label="排序方式"
                    onChange={handleChange}
                >
                    <MenuItem value={'默认'}>{'默认'}</MenuItem>
                    <MenuItem value={'相关度最高'}>{'最新'}</MenuItem>
                    <MenuItem value={'发表日期最近'}>{'最相关'}</MenuItem>
                    <MenuItem value={'引用量最高'}>{'引用量最高'}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}


function SearchResults() {
    let infos = [
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
        {
            'title':'test title',
            'authors':['maple','AboveParadise','frog'],
            'time':'2022',
            'organ':'Beihang University',
            'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
            'labels':['graph','transform','edges']
        },
    ]
    let page_show_num = 10
    let page_num = Math.ceil(infos.length / page_show_num)
    let page_num_array = Array.apply(null, {length: page_num}).map((item, index) => {
        return index
    })
    delete page_num_array[0]
    let card_index_min = 0
    let card_index_max = page_show_num - 1

    // count from 1
    const [current_page_index, setPage] = React.useState(1);
    const handleChange1 = (event: SelectChangeEvent) => {
        setPage(event.target.value);
        card_index_min = page_show_num * (current_page_index - 1)
        card_index_max = page_show_num * (current_page_index) - 1
    };
    const handleChange2 = (event, value: number) => {
        setPage(value);
        // set show_card index range
        // attention: the card index count from 0
        card_index_min = page_show_num * (current_page_index - 1)
        card_index_max = page_show_num * (current_page_index) - 1
    };


    return(
        <Box>
            <Filter/>
            {/*右侧界面*/}
            <Box>
                {/*上方页码选择*/}
                <Box float={'left'} ml={'30%'} mt={'-50'}>
                    <FormControl sx={{minWidth: 100 }} size="small">
                        <Select
                            value={current_page_index}
                            onChange={handleChange1}
                        >
                            {
                                page_num_array.map((value, key) => {
                                    return (
                                        <MenuItem value={value}>{'第' + value + '页'}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                {/*排序*/}
                <Sort/>
                {/*论文卡片*/}
                <Box mt={'200'}>
                    {
                        infos.map((value,key) => {
                            if(key >= card_index_min && key <= card_index_max) {
                                return (
                                    <ResultCard props={value}/>
                                )
                            }
                            return <></>
                        })
                    }
                </Box>
                {/*分页*/}
                <Box width={'50%'} ml={'40%'} mt={'20'}>
                    <Pagination count={page_num} page={current_page_index} onChange={handleChange2} variant='outlined' color='primary'/>
                </Box>
            </Box>
        </Box>
    )
}

export default SearchResults;
