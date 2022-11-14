//
// Created by zyc on 2022/11/11.
//

import * as React from 'react';
import {Box, Select} from "@chakra-ui/react";
import ResultCard from "./result_card";
import Filter from "./filter";
import {MdArrowDropDown} from "react-icons/md";
import {Pagination} from "antd";
import "antd/dist/antd.min.css";



function Sort() {
    const [sort_order, setSortOrder] = React.useState('默认');

    const handleChange = (event) => {
        setSortOrder(event.target.value);
    };

    return(
        <Box float={'right'} mr={'20%'} mt={'-50'}>
            <Select onChange={handleChange} icon={<MdArrowDropDown />} size={'sm'} colorScheme={'blue'} focusBorderColor={'blue.500'}>
                <option value={'默认'}>{'默认'}</option>
                <option value={'最新'}>{'最新'}</option>
                <option value={'最相关'}>{'最相关'}</option>
                <option value={'引用量最高'}>{'引用量最高'}</option>
            </Select>
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
    const handleChange = (page,pageSize) => {
        setPage(page);
        // set show_card index range
        // attention: the card index count from 0
        card_index_min = page_show_num * (current_page_index - 1)
        card_index_max = page_show_num * (current_page_index) - 1
        console.log(current_page_index)
    };


    return(
        <Box>
            {/*右侧界面*/}
            <Filter/>
            <Box>
                {/*排序*/}
                <Sort/>
                {/*论文卡片*/}
                <Box mt={'200'}>
                    {
                        infos.map((value,key) => {
                            if(key >= card_index_min && key <= card_index_max) {
                                return (
                                    <ResultCard props={value} />
                                )
                            }
                            return <></>
                        })
                    }
                </Box>
                {/*分页*/}
                <Box width={'50%'} ml={'40%'} mt={'50px'}>
                    <Pagination onChange={handleChange} total={100} showSizeChanger={false}/>
                </Box>
            </Box>
        </Box>
    )
}

export default SearchResults;
