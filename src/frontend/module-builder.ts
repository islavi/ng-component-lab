import { NgModule, Component, Type, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { flatten } from 'lodash';
import { Experiment, ExperimentCase, ExperimentGroup } from './models/experiment';
import { ResolvedLab } from './models/lab';

interface ExperimentCaseComponentWrapper {
  id: string,
  component: Type<any>
}

export function getModuleForExperiments(
  inputModule: ModuleWithProviders | Type<any>,
  experiments: Experiment[]
): ResolvedLab {

  const componentsWithIds:ExperimentCaseComponentWrapper[] = [];

  experiments.forEach((exp:Experiment)=> {
    exp.groups.forEach((group:ExperimentGroup)=> {
      group.cases.forEach((cas:ExperimentCase)=> {
        componentsWithIds.push(
          {
            id: cas.id,
            component: generateComponent(cas)
          }
        );
      });
    });
  });

  const components = componentsWithIds.reduce((all, next) => {
    return Object.assign(all, { [next.id]: next.component });
  }, {});

  const ngModule = generateNgModule(inputModule, componentsWithIds.map(e => e.component));

  return { ngModule, components };
}

export function generateCases(experimentGroup: ExperimentGroup): any {

  const componentsWithIds = flatten(experimentGroup.cases.map(c => {
    return {
      id: c.id,
      component: generateComponent(c)
    }
  }));

  const components = componentsWithIds.reduce((all, next) => {
    return Object.assign(all, { [next.id]: next.component });
  }, {});

  return { components, componentsWithIds };

}

export function generateComponent(experimentCase: ExperimentCase): Type<any> {
  @Component({
    template: experimentCase.template,
    styles: experimentCase.styles
  })
  class ExperimentCaseComponent {
    constructor() {
      Object.assign(this, experimentCase.context || {});
    }
  }

  return ExperimentCaseComponent;
}

export function generateNgModule(inputModule: ModuleWithProviders | Type<any>, components: Type<any>[]): Type<any> {
  @NgModule({
    imports: [
      inputModule
    ],
    declarations: [
      components
    ],
    entryComponents: [
      components
    ]
  })
  class ExperimentModule { }

  return ExperimentModule;
}
