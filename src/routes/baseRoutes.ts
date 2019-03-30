import {Request, Response} from 'express';
import express = require('express');
import { CreateContainer } from '../repository/createContainer';
import { messages } from '../common/enums';

export abstract class BaseRoutes<T>{

    abstract getEntity(): string;
    abstract getMethod(): string;

    public routes(app : express.Application): void{
        
        //List
        app.route(this.getMethod())
            .get(
                (req: Request, res: Response) => {         
                    // let createContainer = require('../repository/createContainer');
                    let c = CreateContainer.getContainer();
                    let repo = c.getService(this.getEntity());
                    repo.getList((result : T[]) => {
                        try{
                            res.status(200).json(result);
                        }
                        catch(any){
                            res.status(500).json(any);
                        }
                    }
                );
            }
        )

        //Save
        app.route(this.getMethod())
            .post(
                (req: Request, res: Response)=>{
                    let c = CreateContainer.getContainer();
                    let repo = c.getService(this.getEntity());
                    repo.saveEntity(
                        req.body, (result : T) => {
                            try{
                                res.status(200).json(result);
                            }
                            catch(any){
                                res.status(500).json(any);
                            }
                        }
                    );
                }
            )

        //Update
        app.route(this.getMethod() + "/:id")
            .put(
                (req: Request, res: Response)=>{
                    let c = CreateContainer.getContainer();
                    let repo = c.getService(this.getEntity());

                    // res.status(200).json(req.body);

                    repo.updateEntity(
                        req.body, (result : T) => {
                            try{
                                res.status(200).json(result);
                            }
                            catch(any){
                                res.status(500).json(any);
                            }
                        }
                    );
                }
            )

        //Detail
        app.route(this.getMethod() + '/:id')
            .get(
                (req: Request, res: Response)=>{
                    let c = CreateContainer.getContainer();
                    let repo = c.getService(this.getEntity());
                    let id = req.params.id;
                    repo.getEntityById(
                        id, (result : T) => {
                            try{
                                res.status(200).json(result);
                            }
                            catch(any){
                                res.status(500).json(any);
                            }
                        }
                    );
                }
            )

        // Delete
        app.route(this.getMethod()+ "/:id")
            .delete(
                (req: Request, res: Response)=>{
                    let id = req.params.id;
                    let c = CreateContainer.getContainer();
                    let repo = c.getService(this.getEntity());
                    repo.deleteEntity(
                        id, (result : T) => {
                            try{
                                res.status(200).json(result);
                            }
                            catch(any){
                                res.status(500).json(any);
                            }
                        }
                    );
                }
            )
        //Test
        app.route(this.getMethod() + '/test')
            .get(
                (req: Request, res: Response) => 
                {
                    res.status(200).json(messages.TEST_OK);
                }
            )

        //Test 2
        app.route(this.getMethod() + '/entityName')
            .get(
                (req: Request, res: Response) => 
                {
                    res.status(200).json(this.getEntity());
                }
            )
    }
}